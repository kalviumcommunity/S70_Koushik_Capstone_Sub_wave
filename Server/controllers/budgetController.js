const Budget = require('../models/Budget');
const Subscription = require('../models/Subscription');

// Get budget statistics
const getBudgetStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    let budget = await Budget.findOne({
      userId: req.user.id,
      month: currentMonth,
      year: currentYear
    });

    if (!budget) {
      // Create default budget if none exists
      budget = await Budget.create({
        userId: req.user.id,
        total: 1000,
        month: currentMonth,
        year: currentYear
      });
    }

    // Get actual spending from subscriptions
    const subscriptions = await Subscription.find({ userId: req.user.id });
    const actualSpending = subscriptions.reduce((total, sub) => {
      if (sub.category && budget.categories[sub.category] !== undefined) {
        return total + (sub.price || 0);
      }
      return total;
    }, 0);

    res.status(200).json({
      budget: {
        total: budget.total,
        spent: budget.spent,
        remaining: budget.remaining,
        categories: budget.categories
      },
      actualSpending,
      month: currentMonth,
      year: currentYear
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get budget history
const getBudgetHistory = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id })
      .sort({ year: -1, month: -1 })
      .limit(12);

    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Set budget
const setBudget = async (req, res) => {
  try {
    const { total, categories } = req.body;
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    let budget = await Budget.findOne({
      userId: req.user.id,
      month: currentMonth,
      year: currentYear
    });

    if (budget) {
      budget.total = total || budget.total;
      if (categories) {
        budget.categories = { ...budget.categories, ...categories };
      }
      await budget.save();
    } else {
      budget = await Budget.create({
        userId: req.user.id,
        total: total || 1000,
        categories: categories || {},
        month: currentMonth,
        year: currentYear
      });
    }

    res.status(200).json({
      message: 'Budget set successfully',
      budget: {
        total: budget.total,
        spent: budget.spent,
        remaining: budget.remaining,
        categories: budget.categories
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update budget
const updateBudget = async (req, res) => {
  try {
    const { total, categories } = req.body;
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    const budget = await Budget.findOne({
      userId: req.user.id,
      month: currentMonth,
      year: currentYear
    });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    if (total !== undefined) budget.total = total;
    if (categories) {
      budget.categories = { ...budget.categories, ...categories };
    }

    await budget.save();

    res.status(200).json({
      message: 'Budget updated successfully',
      budget: {
        total: budget.total,
        spent: budget.spent,
        remaining: budget.remaining,
        categories: budget.categories
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getBudgetStats,
  getBudgetHistory,
  setBudget,
  updateBudget
}; 