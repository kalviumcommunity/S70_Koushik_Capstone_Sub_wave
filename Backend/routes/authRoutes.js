const express = require('express');
const { register, login, verifyEmail, forgotPassword, resetPassword, checkVerification } = require('../controllers/authController');
const router = express.Router();
const passport = require('../config/googleAuth');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/User");


// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const resetLink = `http://localhost:5173/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Reset Your Password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`,
  });

  res.json({ message: "Reset link sent to email" });
});

// Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

// Regular auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Verification routes
router.post('/check-verification', checkVerification);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}&user=${JSON.stringify(req.user)}`);
  }
);

module.exports = router;

