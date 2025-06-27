const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Protected Routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.delete('/profile', protect, deleteUser);

// Admin-level route (if needed)
router.get('/all', protect, getAllUsers);

module.exports = router;
