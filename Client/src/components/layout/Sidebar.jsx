import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import {
  RiDashboardLine,
  RiFileListLine,
  RiWalletLine,
  RiNotification3Line,
  RiSettings4Line,
  RiLogoutBoxLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiShareLine,
  RiAdminLine,
  RiQuestionLine,
} from 'react-icons/ri';
import subwaveLogo from '../../assets/logo.png';

const menuItems = [
  { path: '/dashboard', icon: RiDashboardLine, label: 'Dashboard' },
  { path: '/subscriptions', icon: RiFileListLine, label: 'Subscriptions' },
  { path: '/budget', icon: RiWalletLine, label: 'Budget' },
  { path: '/notifications', icon: RiNotification3Line, label: 'Notifications' },
  { path: '/settings', icon: RiSettings4Line, label: 'Settings' },
  { path: '/subscription-sharing', icon: RiShareLine, label: 'Subscription Sharing' },
  { path: '/admin-panel', icon: RiAdminLine, label: 'Admin Panel' },
  { path: '/help-support', icon: RiQuestionLine, label: 'Help & Support' },
];

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-screen bg-white shadow-lg z-50 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <img src={subwaveLogo} alt="SubWave" className="h-8" />
            {!isCollapsed && <span className="ml-2 font-bold text-xl">SubWave</span>}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`text-gray-500 hover:text-primary-600 ${isCollapsed ? 'absolute right-0 mr-2' : ''}`}
          >
            {isCollapsed ? <RiMenuUnfoldLine size={20} /> : <RiMenuFoldLine size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-600 relative group ${
                  isActive ? 'text-primary-600' : 'hover:text-primary-600'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-full bg-primary-600"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`text-xl ${isActive ? 'text-primary-600' : 'group-hover:text-primary-600'}`}
                />
                {!isCollapsed && (
                  <span className="ml-4 font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            {!isCollapsed && (
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-primary-600"
              title="Logout"
            >
              <RiLogoutBoxLine size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar; 