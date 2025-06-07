import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const SubscriptionOverview = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h2 className="text-lg font-semibold mb-4">Subscription Overview</h2>
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: 'Total', value: '21', subtext: 'subscriptions', letter: 'T' },
        { label: 'Monthly', value: '$247.00', subtext: 'spendings', letter: 'M' },
        { label: 'Next Renewal', value: '0.00', letter: 'N' }
      ].map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, translateY: -5 }}
          className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              <span className="text-xs text-gray-600">{item.letter}</span>
            </div>
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          {item.subtext && (
            <p className="text-sm text-gray-500">{item.subtext}</p>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const UpcomingRenewals = () => {
  const renewals = [
    {
      id: 1,
      name: 'Netflix',
      date: 'Feb 28, 2024',
      amount: 19.99,
    },
    {
      id: 2,
      name: 'Spotify',
      date: 'Mar 15, 2024',
      amount: 14.99,
    },
    {
      id: 3,
      name: 'Adobe Creative Cloud',
      date: 'Mar 20, 2024',
      amount: 54.99,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-lg font-semibold mb-4">Upcoming Renewals</h2>
      <div className="space-y-4">
        {renewals.map((renewal, index) => (
          <motion.div
            key={renewal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {renewal.name[0]}
                </span>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">{renewal.name}</h3>
                <p className="text-sm text-gray-500">{renewal.date}</p>
              </div>
            </div>
            <p className="font-medium text-gray-900">${renewal.amount}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SubscriptionOverview />
        <UpcomingRenewals />
      </div>
    </div>
  );
};

export default Dashboard; 