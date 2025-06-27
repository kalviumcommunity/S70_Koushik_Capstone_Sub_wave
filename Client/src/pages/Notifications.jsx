import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  RiNotification3Line,
  RiSettings3Line,
  RiCheckLine,
  RiCloseLine,
  RiMailLine,
  RiSmartphoneLine,
  RiBellLine,
} from 'react-icons/ri';
// import { notificationAPI } from '../services/api';
import toast from 'react-hot-toast';

const NotificationCard = ({ notification, onMarkAsRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'renewal':
        return <RiBellLine className="text-blue-500" />;
      case 'payment':
        return <RiMailLine className="text-green-500" />;
      default:
        return <RiNotification3Line className="text-purple-500" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-lg border ${
        notification.read ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-gray-100 rounded-full">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{notification.title}</h3>
          <p className="text-gray-500 text-sm mt-1">{notification.message}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400">
              {new Date(notification.createdAt).toLocaleDateString()}
            </span>
            {!notification.read && (
              <button
                onClick={() => onMarkAsRead(notification._id)}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <RiCheckLine />
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NotificationSettings = ({ preferences, onUpdatePreferences }) => {
  const [settings, setSettings] = useState(preferences);

  const handleToggle = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    onUpdatePreferences(newSettings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <RiSettings3Line />
        Notification Preferences
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <RiBellLine className="text-xl text-gray-500" />
            <div>
              <p className="font-medium">Renewal Reminders</p>
              <p className="text-sm text-gray-500">
                Get notified before subscription renewals
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.renewalReminders}
              onChange={() => handleToggle('renewalReminders')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <RiMailLine className="text-xl text-gray-500" />
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">
                Receive important updates via email
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <RiSmartphoneLine className="text-xl text-gray-500" />
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-500">
                Get instant alerts on your device
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={() => handleToggle('pushNotifications')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
    </motion.div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    // Example notifications for demo
    {
      _id: '1',
      type: 'renewal',
      title: 'Netflix Renewal Reminder',
      message: 'Your Netflix subscription will renew in 3 days.',
      createdAt: new Date().toISOString(),
      read: false,
    },
    {
      _id: '2',
      type: 'payment',
      title: 'Spotify Payment Successful',
      message: 'Your payment for Spotify was successful.',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      read: true,
    },
    {
      _id: '3',
      type: 'general',
      title: 'Welcome to SubWave!',
      message: 'Start tracking your subscriptions and budget today.',
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true,
    },
  ]);
  const [preferences, setPreferences] = useState({
    renewalReminders: true,
    emailNotifications: true,
    pushNotifications: false,
  });
  const unreadCount = notifications.filter((n) => !n.read).length;
  const handleMarkAsRead = async (id) => {
    setNotifications(
      notifications.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
    toast.success('Notification marked as read');
  };
  const handleUpdatePreferences = async (newPreferences) => {
    setPreferences(newPreferences);
    toast.success('Notification preferences updated');
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-blue-100 rounded-full">
          <RiNotification3Line className="text-3xl text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-500">
            You have {unreadCount} unread notification{unreadCount !== 1 && 's'}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-morphism p-6 rounded-2xl shadow-2xl space-y-4"
          >
            <AnimatePresence>
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification._id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </AnimatePresence>
            {notifications.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-gray-500"
              >
                <RiNotification3Line className="text-6xl mb-4 text-blue-200 animate-bounce" />
                <p className="text-lg font-semibold">No notifications to display</p>
                <p className="text-sm">You're all caught up!</p>
              </motion.div>
            )}
            {notifications.length > 0 && (
              <button
                onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                className="mt-4 text-sm text-blue-600 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </motion.div>
        </div>
        <div className="lg:col-span-1">
          <NotificationSettings
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        </div>
      </div>
    </div>
  );
};

export default Notifications; 