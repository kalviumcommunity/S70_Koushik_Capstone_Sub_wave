const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers
} = require('../controllers/userController');
// const verifyToken = require('../middleware/authMiddleware');

router.get('/profile', getUserProfile);

router.put('/profile', updateUserProfile);

router.get('/all', getAllUsers);

module.exports = router;
