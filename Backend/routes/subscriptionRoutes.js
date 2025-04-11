const express = require('express');
const { getSubscriptions,  addSubscription,  updateSubscription,deleteSubscription} = require('../controllers/subscriptionController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect);

// get route for fetching all the subscriptions
router.get('/', getSubscriptions);



router.post('/', addSubscription);

// Update subscription
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

module.exports = router;
