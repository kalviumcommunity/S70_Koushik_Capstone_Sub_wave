const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');
const { OAuth2Client } = require('google-auth-library');

// Create OAuth2 client
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Validate email format and verify with Google
const validateEmail = async (email) => {
  // First check basic email format
  if (!emailValidator.validate(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }

  // Check if it's a Gmail address
  const isGmail = email.toLowerCase().endsWith('@gmail.com');
  
  if (!isGmail) {
    return { isValid: false, message: 'Only Gmail addresses are allowed. Please use a Gmail account.' };
  }

  try {
    // Use Google's People API to verify email existence
    const response = await oauth2Client.request({
      url: `https://people.googleapis.com/v1/people:searchDirectoryPeople`,
      method: 'GET',
      params: {
        query: email,
        readMask: 'emailAddresses',
        sources: ['DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE']
      }
    });

    // If we get a response with the email, it exists
    if (response.data && response.data.people && response.data.people.length > 0) {
      return { isValid: true, message: 'Email is valid and exists' };
    } else {
      return { isValid: false, message: 'This Gmail address does not exist. Please use a real Gmail address.' };
    }
  } catch (error) {
    // Even if we can't verify with Google API, we'll still allow Gmail addresses
    // but they'll need to verify through email
    return { isValid: true, message: 'Email format is valid, verification email will be sent' };
  }
};

// Send verification email
const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email - SubWave',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4F46E5; text-align: center;">Welcome to SubWave!</h1>
        <p style="font-size: 16px; color: #374151;">Please verify your email address to complete your registration. This link will expire in <strong>8 minutes</strong>.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="
            background-color: #4F46E5;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            display: inline-block;
          ">Verify Email Address</a>
        </div>
        <p style="color: #4B5563; font-size: 14px;">If you didn't create an account with SubWave, you can safely ignore this email.</p>
        <p style="color: #EF4444; font-size: 14px; font-weight: bold;">Note: This verification link will expire in 8 minutes for security reasons.</p>
      </div>
    `
  };

  return await transporter.sendMail(mailOptions);
};

// Send password reset email
const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Your Password - SubWave',
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested to reset your password. Click the link below to set a new password:</p>
      <a href="${resetUrl}" style="
        padding: 10px 20px;
        background-color: #4F46E5;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
        margin: 20px 0;
      ">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = {
  validateEmail,
  sendVerificationEmail,
  sendPasswordResetEmail
}; 