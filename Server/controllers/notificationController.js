const Notification = require('../models/Notification');
const User = require('../models/User');

// Get all notifications for user
const getAllNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    
    const query = { userId: req.user.id };
    if (unreadOnly === 'true') {
      query.isRead = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Notification.countDocuments(query);

    res.status(200).json({
      notifications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update notification preferences
const updatePreferences = async (req, res) => {
  try {
    const { email, push, renewal, budget } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.preferences.notifications = {
      email: email !== undefined ? email : user.preferences.notifications.email,
      push: push !== undefined ? push : user.preferences.notifications.push,
      renewal: renewal !== undefined ? renewal : user.preferences.notifications.renewal,
      budget: budget !== undefined ? budget : user.preferences.notifications.budget
    };

    await user.save();

    res.status(200).json({ 
      message: 'Notification preferences updated',
      preferences: user.preferences.notifications
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    
    const notification = await Notification.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get unread count
const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.user.id,
      isRead: false
    });

    res.status(200).json({ unreadCount: count });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create notification (internal use)
const createNotification = async (userId, title, message, type = 'system', metadata = {}) => {
  try {
    const notification = await Notification.create({
      userId,
      title,
      message,
      type,
      metadata
    });
    return notification;
  } catch (err) {
    console.error('Error creating notification:', err);
    return null;
  }
};

module.exports = {
  getAllNotifications,
  markAsRead,
  markAllAsRead,
  updatePreferences,
  deleteNotification,
  getUnreadCount,
  createNotification
}; 