const express = require('express');
const {
  getBudgetStats,
  getBudgetHistory,
  setBudget,
  updateBudget
} = require('../controllers/budgetController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

/**
 * @swagger
 * /api/budget/stats:
 *   get:
 *     summary: Get budget statistics
 *     tags: [Budget]
 *     responses:
 *       200:
 *         description: Budget statistics retrieved successfully
 */
router.get('/stats', getBudgetStats);

/**
 * @swagger
 * /api/budget/history:
 *   get:
 *     summary: Get budget history
 *     tags: [Budget]
 *     responses:
 *       200:
 *         description: Budget history retrieved successfully
 */
router.get('/history', getBudgetHistory);

/**
 * @swagger
 * /api/budget:
 *   post:
 *     summary: Set budget
 *     tags: [Budget]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *               categories:
 *                 type: object
 *     responses:
 *       200:
 *         description: Budget set successfully
 */
router.post('/', setBudget);

/**
 * @swagger
 * /api/budget:
 *   put:
 *     summary: Update budget
 *     tags: [Budget]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *               categories:
 *                 type: object
 *     responses:
 *       200:
 *         description: Budget updated successfully
 */
router.put('/', updateBudget);

module.exports = router; 