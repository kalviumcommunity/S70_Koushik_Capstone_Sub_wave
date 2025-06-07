import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  CreditCardIcon,
  BanknotesIcon,
  BellIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear all auth data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userName');
    
    // Redirect to signin page
    navigate('/signin');
  };

  const menuItems = [
    { text: 'Dashboard', icon: ChartBarIcon, path: '/dashboard' },
    { text: 'Subscriptions', icon: CreditCardIcon, path: '/subscriptions' },
    { text: 'Budget', icon: BanknotesIcon, path: '/budget' },
    { text: 'Notifications', icon: BellIcon, path: '/notifications' },
    { text: 'Settings', icon: Cog6ToothIcon, path: '/settings' },
    { text: 'Admin Panel', icon: ShieldCheckIcon, path: '/admin' },
    { text: 'Help & Support', icon: QuestionMarkCircleIcon, path: '/help' },
    { text: 'Subscription Sharing', icon: ShareIcon, path: '/subscription-sharing' },
  ];

  return (
    <>
      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-2xl font-bold text-primary-500">SubWave</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.text}
                    onClick={() => navigate(item.path)}
                    className={`nav-link ${
                      location.pathname === item.path ? 'active' : ''
                    }`}
                  >
                    <Icon className="mr-3 h-6 w-6" />
                    {item.text}
                  </a>
                );
              })}
            </nav>
          </div>
          
          {/* User profile section */}
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src={localStorage.getItem('userAvatar') || 'https://via.placeholder.com/36'}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {JSON.parse(localStorage.getItem('user'))?.name || 'User'}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-gray-500 hover:text-primary-500"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden">
        <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-white px-4 shadow-sm">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-primary-500">SubWave</h1>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-900"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <UserCircleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-2xl font-bold text-primary-500">SubWave</h1>
            </div>
            <div className="mt-5 h-0 flex-1 overflow-y-auto">
              <nav className="px-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.text}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`nav-link ${
                        location.pathname === item.path ? 'active' : ''
                      }`}
                    >
                      <Icon className="mr-3 h-6 w-6" />
                      {item.text}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Profile menu */}
      {isProfileMenuOpen && (
        <div className="absolute right-0 top-16 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <a
            onClick={() => {
              navigate('/settings');
              setIsProfileMenuOpen(false);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </a>
          <a
            onClick={() => {
              handleLogout();
              setIsProfileMenuOpen(false);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </a>
        </div>
      )}

      {/* Main content wrapper */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Your page content goes here */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Navigation; 