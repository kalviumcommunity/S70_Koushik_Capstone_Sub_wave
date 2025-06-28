const express = require('express');
const {
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  inviteCollaborator,
  updateCollaboratorRole,
  removeCollaborator,
  getActivityLogs,
  getSpendingByMonth,
  getCategoryBreakdown,
  getBudgetSuggestions,
  upload,
  uploadFile,
<<<<<<< HEAD
  getFiles
=======
  getFiles,
  shareSubscription,
  removeShare,
  getSharedSubscriptions
>>>>>>> be25477 (Implemented google)
} = require('../controllers/subscriptionController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();
router.use(protect);

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     summary: Get all subscriptions for the user
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: List of subscriptions
 *   post:
 *     summary: Add a new subscription
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Subscription created
 */
router.get('/', getSubscriptions);
router.post('/', addSubscription);
/**
 * @swagger
 * /api/subscriptions/{id}:
 *   put:
 *     summary: Update a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Subscription updated
 *   delete:
 *     summary: Delete a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Subscription deleted
 */
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);
router.post('/invite-collaborator', inviteCollaborator);
router.post('/update-collaborator-role', updateCollaboratorRole);
router.post('/remove-collaborator', removeCollaborator);
<<<<<<< HEAD
=======
router.post('/share', shareSubscription);
router.delete('/:subscriptionId/share/:userId', removeShare);
router.get('/shared', getSharedSubscriptions);
>>>>>>> be25477 (Implemented google)
router.get('/:subscriptionId/activity-logs', getActivityLogs);
router.get('/analytics/monthly', getSpendingByMonth);
router.get('/analytics/category', getCategoryBreakdown);
router.get('/analytics/suggestions', getBudgetSuggestions);
router.post('/upload-file', upload, uploadFile);
router.get('/:subscriptionId/files', getFiles);

module.exports = router;
