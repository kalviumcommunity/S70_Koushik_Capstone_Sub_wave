import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NotificationIcon from '../assets/Notification.png.jpg';

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'renewal',
      service: 'Spotify Premium',
      message: 'Renews in 5 days - $9.99/month',
      date: new Date(),
    },
    {
      id: 2,
      type: 'renewal',
      service: 'Netflix Standard',
      message: 'Renews in 5 days - $19.99/month',
      date: new Date(),
    }
  ]);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    budgetAlerts: true,
    priceChangeAlerts: true,
    renewalReminders: true,
    paymentDueAlerts: true
  });

  const handleToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <Sidebar />
      
      <div className="ml-64 p-8">
        <div className="flex items-center space-x-3 mb-8">
          <img src={NotificationIcon} alt="Notifications" className="w-8 h-8 object-contain" />
          <h1 className="text-2xl font-bold text-white">Notifications & Alerts</h1>
        </div>

        {/* Upcoming Renewals */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Upcoming Renewals</h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white">
                    🔄
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{notification.service}</h3>
                    <p className="text-sm text-white/70">{notification.message}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-white/20 text-white rounded-lg hover:bg-white/30">
                    Snooze
                  </button>
                  <button className="px-3 py-1 text-sm border border-white/20 text-white rounded-lg hover:bg-white/5">
                    Disable
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Notification Preferences</h2>
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Email notifications</h3>
                <p className="text-sm text-white/70">Receive notifications via email</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.emailNotifications ? 'bg-white/30' : 'bg-white/10'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Push notifications</h3>
                <p className="text-sm text-white/70">Receive push notifications</p>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.pushNotifications ? 'bg-white/30' : 'bg-white/10'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Budget Alerts */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Budget alerts</h3>
                <p className="text-sm text-white/70">Get notified about budget updates</p>
              </div>
              <button
                onClick={() => handleToggle('budgetAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.budgetAlerts ? 'bg-white/30' : 'bg-white/10'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.budgetAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Price Change Alerts */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Price change alerts</h3>
                <p className="text-sm text-white/70">Get notified about subscription price changes</p>
              </div>
              <button
                onClick={() => handleToggle('priceChangeAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.priceChangeAlerts ? 'bg-white/30' : 'bg-white/10'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.priceChangeAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-white/10">
              <button className="w-full px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                Save preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 