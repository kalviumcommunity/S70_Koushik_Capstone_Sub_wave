import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../features/auth/authSlice';
<<<<<<< HEAD
import { RiUserLine, RiLockLine, RiNotification3Line, RiPaletteLine } from 'react-icons/ri';
=======
import { RiUserLine, RiLockLine, RiNotification3Line, RiPaletteLine, RiBellLine } from 'react-icons/ri';
>>>>>>> be25477 (Implemented google)
import { userAPI } from '../services/api';
import toast from 'react-hot-toast';
import axios from 'axios';

const SettingsSection = ({ title, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl p-6 shadow-sm"
  >
    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
      <Icon className="text-gray-500" />
      {title}
    </h2>
    {children}
  </motion.div>
);

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [theme, setTheme] = useState('light');
  const [currency, setCurrency] = useState('USD');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [twoFA, setTwoFA] = useState({ enabled: user?.twoFactorEnabled, qr: '', secret: '', otp: '', step: 0 });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await userAPI.updateProfile(profileData);
      dispatch(updateUser(response.data));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
<<<<<<< HEAD
      // await userAPI.changePassword(passwordData);
      // TODO: Implement when backend is ready
=======
      await userAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
>>>>>>> be25477 (Implemented google)
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    try {
<<<<<<< HEAD
      // await userAPI.updatePreferences({ theme, currency, dateFormat });
      // TODO: Implement when backend is ready
=======
      await userAPI.updatePreferences({ theme, currency, dateFormat });
>>>>>>> be25477 (Implemented google)
      toast.success('Preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update preferences');
    }
  };

  const handleEnable2FA = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/auth/enable-2fa', {}, { headers: { Authorization: `Bearer ${token}` } });
      setTwoFA((prev) => ({ ...prev, qr: res.data.qr, secret: res.data.secret, step: 1 }));
    } catch (err) {
      toast.error('Failed to start 2FA setup');
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/auth/verify-2fa', { token: twoFA.otp }, { headers: { Authorization: `Bearer ${token}` } });
      setTwoFA((prev) => ({ ...prev, enabled: true, step: 2 }));
      toast.success('2FA enabled!');
    } catch (err) {
      toast.error('Invalid OTP');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SettingsSection title="Profile Information" icon={RiUserLine}>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="input-field mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="input-field mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture URL
              </label>
              <input
                type="url"
                value={profileData.avatar}
                onChange={(e) =>
                  setProfileData({ ...profileData, avatar: e.target.value })
                }
                className="input-field mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="button-primary w-full"
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </SettingsSection>

        <SettingsSection title="Security" icon={RiLockLine}>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                className="input-field mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="input-field mt-1"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="input-field mt-1"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="button-primary w-full"
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Two-Factor Authentication (2FA)</h3>
            {twoFA.enabled ? (
              <div className="text-green-600 font-medium">2FA is enabled on your account.</div>
            ) : twoFA.step === 1 ? (
              <form onSubmit={handleVerify2FA} className="space-y-4">
                <div className="mb-2">Scan this QR code with Google Authenticator or Authy:</div>
                <img src={twoFA.qr} alt="2FA QR" className="mb-2 w-40 h-40" />
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={twoFA.otp}
                  onChange={e => setTwoFA((prev) => ({ ...prev, otp: e.target.value }))}
                  className="input-field"
                  required
                />
                <button type="submit" className="button-primary">Verify & Enable 2FA</button>
              </form>
            ) : twoFA.step === 2 ? (
              <div className="text-green-600 font-medium">2FA is now enabled!</div>
            ) : (
              <button onClick={handleEnable2FA} className="button-primary">Enable 2FA</button>
            )}
          </div>
        </SettingsSection>

        <SettingsSection title="Preferences" icon={RiPaletteLine}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="input-field mt-1"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="input-field mt-1"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date Format
              </label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="input-field mt-1"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <button
              onClick={handlePreferencesUpdate}
              className="button-primary w-full"
            >
              Save Preferences
            </button>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

export default Settings; 