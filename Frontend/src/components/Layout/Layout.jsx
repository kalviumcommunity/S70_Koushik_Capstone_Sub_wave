import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  CreditCardIcon,
  ChartBarIcon,
  BellIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Subscriptions', path: '/subscriptions', icon: CreditCardIcon },
  { name: 'Budget', path: '/budget', icon: ChartBarIcon },
  { name: 'Notifications', path: '/notifications', icon: BellIcon },
  { name: 'Settings', path: '/settings', icon: Cog6ToothIcon },
  { name: 'Help & support', path: '/help', icon: QuestionMarkCircleIcon },
];

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
        className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <motion.div
            className="h-16 flex items-center px-6 border-b border-gray-200"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-xl font-semibold text-gray-800">SubWave</h1>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="w-5 h-5 mr-3 flex items-center justify-center text-xs">
                      {item.name[0]}
                    </div>
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 ml-64">
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout; 