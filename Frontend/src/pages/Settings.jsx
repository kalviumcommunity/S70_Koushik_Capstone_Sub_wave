import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: JSON.parse(localStorage.getItem('user'))?.name || '',
    email: JSON.parse(localStorage.getItem('user'))?.email || '',
    avatar: localStorage.getItem('userAvatar') || ''
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    renewal: true,
    budget: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'billing', label: 'Billing', icon: '💳' }
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // TODO: Implement profile update
    console.log('Profile updated:', profileData);
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
          
          <div className="bg-white rounded-xl shadow-sm">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        {profileData.avatar ? (
                          <img src={profileData.avatar} alt="Avatar" className="w-20 h-20 rounded-full" />
                        ) : (
                          <span className="text-2xl text-gray-500">👤</span>
                        )}
                      </div>
                      <div>
                        <button type="button" className="text-indigo-600 hover:text-indigo-500">
                          Change photo
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 capitalize">{key} Notifications</h3>
                          <p className="text-sm text-gray-500">
                            Receive notifications about {key} updates
                          </p>
                        </div>
                        <button
                          onClick={() => handleNotificationToggle(key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-indigo-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Change Password</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Update your password to keep your account secure
                      </p>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Change Password
                      </button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing Information</h2>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Payment Methods</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Manage your payment methods for subscriptions
                      </p>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Add Payment Method
                      </button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Billing History</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        View your past billing statements and invoices
                      </p>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        View History
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 