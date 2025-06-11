import React, { useState, useEffect } from 'react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const NotificationItem = ({ notification, onSnooze, onDisable }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
    <div className="flex items-start justify-between">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <BellIcon className="h-6 w-6 text-primary-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-900">
            {notification.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {notification.description}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {notification.time}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onSnooze(notification.id)}
          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Snooze
        </button>
        <button
          onClick={() => onDisable(notification.id)}
          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Disable
        </button>
      </div>
    </div>
  </div>
);

const NotificationPreference = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-200">
    <div className="flex-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
    </div>
    <div className="ml-4">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
      </label>
    </div>
  </div>
);

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    budgetAlerts: true,
    pushNotifications: true,
    paymentDueAlerts: true,
    priceChangeAlerts: true,
  });

  useEffect(() => {
    // TODO: Fetch notifications and preferences from backend
  }, []);

  const handlePreferenceChange = (preference) => (event) => {
    setPreferences({
      ...preferences,
      [preference]: event.target.checked,
    });
    // TODO: Update preferences in backend
  };

  const handleSnooze = (notificationId) => {
    // TODO: Implement snooze functionality
  };

  const handleDisable = (notificationId) => {
    // TODO: Implement disable functionality
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Notifications & Alerts</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Renewals</h2>
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No notifications at this time
              </p>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onSnooze={handleSnooze}
                  onDisable={handleDisable}
                />
              ))
            )}
          </div>
        </div>

        <div>
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">
              Notification Preferences
            </h2>
            <div className="space-y-1">
              <NotificationPreference
                label="Email notifications"
                checked={preferences.emailNotifications}
                onChange={handlePreferenceChange('emailNotifications')}
              />
              <NotificationPreference
                label="Budget alerts"
                checked={preferences.budgetAlerts}
                onChange={handlePreferenceChange('budgetAlerts')}
              />
              <NotificationPreference
                label="Push notifications"
                checked={preferences.pushNotifications}
                onChange={handlePreferenceChange('pushNotifications')}
              />
              <NotificationPreference
                label="Payment due alerts"
                checked={preferences.paymentDueAlerts}
                onChange={handlePreferenceChange('paymentDueAlerts')}
              />
              <NotificationPreference
                label="Price change alerts"
                checked={preferences.priceChangeAlerts}
                onChange={handlePreferenceChange('priceChangeAlerts')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 