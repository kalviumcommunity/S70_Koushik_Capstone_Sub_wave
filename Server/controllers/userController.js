const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get Logged-in User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
<<<<<<< HEAD
=======
    user.avatar = req.body.avatar || user.avatar;
>>>>>>> be25477 (Implemented google)

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
<<<<<<< HEAD
=======
        avatar: updatedUser.avatar,
>>>>>>> be25477 (Implemented google)
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

<<<<<<< HEAD
=======
// Change Password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update User Preferences
const updatePreferences = async (req, res) => {
  try {
    const { theme, currency, dateFormat, notifications } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update preferences
    user.preferences = {
      theme: theme || user.preferences?.theme || 'light',
      currency: currency || user.preferences?.currency || 'USD',
      dateFormat: dateFormat || user.preferences?.dateFormat || 'MM/DD/YYYY',
      notifications: notifications || user.preferences?.notifications || {
        email: true,
        push: true,
        renewal: true,
        budget: true
      }
    };

    await user.save();
    res.status(200).json({ 
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

>>>>>>> be25477 (Implemented google)
// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get All Users
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
<<<<<<< HEAD
=======
  changePassword,
  updatePreferences,
>>>>>>> be25477 (Implemented google)
  deleteUser,
  getAllUsers,
};
