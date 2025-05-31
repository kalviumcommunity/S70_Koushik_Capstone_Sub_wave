const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = user =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '150d' });


exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = user && await bcrypt.compare(password, user.password);
    if (!user || !isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ user,   token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};
