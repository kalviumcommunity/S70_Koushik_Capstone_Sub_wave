const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Apply auth and admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// System Statistics
router.get('/stats', adminController.getSystemStats);

// User Management
router.get('/users', adminController.getAllUsers);
router.put('/users/:userId', adminController.updateUser);
router.delete('/users/:userId', adminController.deleteUser);
router.post('/users/bulk-update', adminController.bulkUpdateUsers);

// System Activities
router.get('/activities', adminController.getSystemActivities);

// Subscription Analytics
router.get('/analytics/subscriptions', adminController.getSubscriptionAnalytics);

module.exports = router; 