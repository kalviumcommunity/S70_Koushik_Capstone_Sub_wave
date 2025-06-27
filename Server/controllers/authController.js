const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const generateToken = user =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '150d' });

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const sendVerificationEmail = async (user, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify your email',
    html: `<p>Hello ${user.name},</p><p>Please verify your email by clicking the link below:</p><a href="${verifyUrl}">Verify Email</a>`,
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const user = await User.create({
      name,
      email,
      password,
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });
    await sendVerificationEmail(user, verificationToken);
    res.status(201).json({ message: 'Registration successful! Please verify your email.' });
  } catch (err) {
    console.error('Registration error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ verificationToken: token, verificationTokenExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired verification token' });
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Email verification failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password, token } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = user && await bcrypt.compare(password, user.password);
    if (!user || !isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    if (!user.isVerified) return res.status(403).json({ message: 'Please verify your email before logging in.' });
    if (user.twoFactorEnabled) {
      if (!token) return res.status(206).json({ message: '2FA required' });
      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
        window: 1
      });
      if (!verified) return res.status(401).json({ message: 'Invalid 2FA token' });
    }
    const jwtToken = generateToken(user);
    res.json({ user, token: jwtToken });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.googleAuth = async (req, res) => {
  const { token, otp } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      // Create a random password for Google users
      const randomPassword = crypto.randomBytes(32).toString('hex');
      user = await User.create({ name, email, password: randomPassword });
    }
    if (user.twoFactorEnabled) {
      if (!otp) return res.status(206).json({ message: '2FA required' });
      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: otp,
        window: 1
      });
      if (!verified) return res.status(401).json({ message: 'Invalid 2FA token' });
    }
    const jwtToken = generateToken(user);
    res.json({ user, token: jwtToken });
  } catch (err) {
    // console.error('Google Auth error:', err);
    res.status(401).json({ message: 'Google authentication failed' });
  }
};

// Enable 2FA: generate secret, return QR code
exports.enable2FA = async (req, res) => {
  const userId = req.user.id;
  try {
    const secret = speakeasy.generateSecret({ name: `SubWave (${req.user.email})` });
    const user = await User.findByIdAndUpdate(userId, { twoFactorTempSecret: secret.base32 }, { new: true });
    const otpauthUrl = secret.otpauth_url;
    const qr = await qrcode.toDataURL(otpauthUrl);
    res.json({ qr, secret: secret.base32 });
  } catch (err) {
    res.status(500).json({ message: 'Failed to enable 2FA' });
  }
};

// Verify 2FA: user submits OTP, activate 2FA if correct
exports.verify2FA = async (req, res) => {
  const userId = req.user.id;
  const { token } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user.twoFactorTempSecret) return res.status(400).json({ message: 'No 2FA setup in progress' });
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorTempSecret,
      encoding: 'base32',
      token,
      window: 1
    });
    if (!verified) return res.status(400).json({ message: 'Invalid OTP' });
    user.twoFactorSecret = user.twoFactorTempSecret;
    user.twoFactorTempSecret = undefined;
    user.twoFactorEnabled = true;
    await user.save();
    res.json({ message: '2FA enabled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to verify 2FA' });
  }
};

// Validate 2FA during login: user submits OTP
exports.validate2FA = async (req, res) => {
  const { email, token } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
      return res.status(400).json({ message: '2FA not enabled for this user' });
    }
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1
    });
    if (!verified) return res.status(400).json({ message: 'Invalid OTP' });
    const jwtToken = generateToken(user);
    res.json({ user, token: jwtToken });
  } catch (err) {
    res.status(500).json({ message: '2FA validation failed' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  console.log('forgotPassword called');
  const { email } = req.body;
  console.log('Email received:', email);
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);
  console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: 'If that email is registered, a reset link has been sent.' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${token}`;
    console.log('Reset URL:', resetUrl);
    await transporter.sendMail({
      to: user.email,
      subject: 'SubWave Password Reset',
      html: `<p>You requested a password reset for SubWave.<br/>Click <a href="${resetUrl}">here</a> to reset your password.<br/>If you did not request this, ignore this email.</p>`
    });
    console.log('Reset email sent to:', user.email);
    return res.status(200).json({ message: 'If that email is registered, a reset link has been sent.' });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
