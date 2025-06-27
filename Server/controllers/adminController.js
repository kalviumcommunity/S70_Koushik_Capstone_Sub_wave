const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Activity = require('../models/Activity');

// Get System Statistics
const getSystemStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isVerified: true });
    const totalSubscriptions = await Subscription.countDocuments();
    const totalValue = await Subscription.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const recentActivities = await Activity.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 12 }
    ]);

    res.status(200).json({
      stats: {
        totalUsers,
        activeUsers,
        totalSubscriptions,
        totalValue: totalValue[0]?.total || 0
      },
      recentActivities,
      userGrowth
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching system stats', error: error.message });
  }
};

// Get All Users (Admin)
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status) {
      query.isVerified = status === 'verified';
    }

    const users = await User.find(query)
      .select('-password -twoFactorSecret -twoFactorTempSecret')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.status(200).json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Update User (Admin)
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, isAdmin, isVerified } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (typeof isAdmin === 'boolean') user.isAdmin = isAdmin;
    if (typeof isVerified === 'boolean') user.isVerified = isVerified;

    await user.save();

    // Log admin action
    await Activity.create({
      user: req.user.id,
      action: 'UPDATE_USER',
      details: `Admin updated user ${user.email}`,
      targetUser: userId
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete User (Admin)
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (userId === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    // Delete user's subscriptions and activities
    await Subscription.deleteMany({ user: userId });
    await Activity.deleteMany({ user: userId });

    await User.findByIdAndDelete(userId);

    // Log admin action
    await Activity.create({
      user: req.user.id,
      action: 'DELETE_USER',
      details: `Admin deleted user ${user.email}`,
      targetUser: userId
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Get System Activities
const getSystemActivities = async (req, res) => {
  try {
    const { page = 1, limit = 20, action = '' } = req.query;
    
    let query = {};
    if (action) {
      query.action = action;
    }

    const activities = await Activity.find(query)
      .populate('user', 'name email')
      .populate('targetUser', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Activity.countDocuments(query);

    res.status(200).json({
      activities,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error: error.message });
  }
};

// Get Subscription Analytics
const getSubscriptionAnalytics = async (req, res) => {
  try {
    const totalSubscriptions = await Subscription.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    
    const categoryStats = await Subscription.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ]);

    const monthlySpending = await Subscription.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 12 }
    ]);

    const topSubscriptions = await Subscription.find()
      .populate('user', 'name email')
      .sort({ amount: -1 })
      .limit(10);

    res.status(200).json({
      totalSubscriptions,
      activeSubscriptions,
      categoryStats,
      monthlySpending,
      topSubscriptions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription analytics', error: error.message });
  }
};

// Bulk Operations
const bulkUpdateUsers = async (req, res) => {
  try {
    const { userIds, updates } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'User IDs array is required' });
    }

    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: updates }
    );

    // Log admin action
    await Activity.create({
      user: req.user.id,
      action: 'BULK_UPDATE_USERS',
      details: `Admin bulk updated ${userIds.length} users`,
      metadata: { userIds, updates }
    });

    res.status(200).json({ 
      message: `Successfully updated ${result.modifiedCount} users`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error performing bulk update', error: error.message });
  }
};

module.exports = {
  getSystemStats,
  getAllUsers,
  updateUser,
  deleteUser,
  getSystemActivities,
  getSubscriptionAnalytics,
  bulkUpdateUsers
}; 