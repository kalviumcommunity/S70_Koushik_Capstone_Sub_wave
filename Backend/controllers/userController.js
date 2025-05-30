const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // remove password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const bcrypt = require('bcryptjs');
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
};
