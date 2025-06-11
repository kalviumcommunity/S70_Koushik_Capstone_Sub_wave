import React, { useState } from 'react';
import { UserCircleIcon, KeyIcon, BellIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import SettingsIcon from '../../assets/Settings.png.jpg';

const SettingsSection = ({ title, children }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6">
    <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
    {children}
  </div>
);

const Settings = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    currency: 'USD',
    language: 'English',
    theme: 'light',
  });

  const handleInputChange = (field) => (event) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Save user settings
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-6">
          <img src={SettingsIcon} alt="Settings" className="w-8 h-8 object-contain" />
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <SettingsSection title="Profile Information">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={handleInputChange('name')}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={handleInputChange('email')}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      onChange={handleInputChange('phone')}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    />
                  </div>
                </div>
              </SettingsSection>

              <SettingsSection title="Preferences">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Currency
                    </label>
                    <select
                      value={user.currency}
                      onChange={handleInputChange('currency')}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Language
                    </label>
                    <select
                      value={user.language}
                      onChange={handleInputChange('language')}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Theme
                    </label>
                    <select
                      value={user.theme}
                      onChange={handleInputChange('theme')}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                </div>
              </SettingsSection>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <SettingsSection title="Quick Actions">
              <nav className="space-y-2">
                <a
                  href="#security"
                  className="flex items-center px-4 py-2 text-white rounded-md hover:bg-white/5"
                >
                  <KeyIcon className="h-5 w-5 mr-3 text-white/70" />
                  Security Settings
                </a>
                <a
                  href="#notifications"
                  className="flex items-center px-4 py-2 text-white rounded-md hover:bg-white/5"
                >
                  <BellIcon className="h-5 w-5 mr-3 text-white/70" />
                  Notification Preferences
                </a>
                <a
                  href="#billing"
                  className="flex items-center px-4 py-2 text-white rounded-md hover:bg-white/5"
                >
                  <CreditCardIcon className="h-5 w-5 mr-3 text-white/70" />
                  Billing & Payments
                </a>
              </nav>
            </SettingsSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 