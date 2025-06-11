import React, { useState, useEffect } from 'react';
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetOverview = ({ data }) => (
  <div className="card">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-primary-50 rounded-lg">
        <div className="flex items-center mb-2">
          <BanknotesIcon className="h-5 w-5 text-primary-500 mr-2" />
          <span className="text-sm text-gray-600">Total Budget</span>
        </div>
        <p className="text-2xl font-bold text-primary-500">${data.totalBudget}</p>
        <p className="text-sm text-gray-500 mt-1">
          {data.daysLeft} days left
        </p>
      </div>
      <div className="p-4 bg-secondary-50 rounded-lg">
        <div className="flex items-center mb-2">
          <ArrowTrendingUpIcon className="h-5 w-5 text-secondary-500 mr-2" />
          <span className="text-sm text-gray-600">Expenses</span>
        </div>
        <p className="text-2xl font-bold text-secondary-500">${data.expenses}</p>
        <p className="text-sm text-gray-500 mt-1">
          {((data.expenses / data.totalBudget) * 100).toFixed(1)}% of budget
        </p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center mb-2">
          <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">Days Left</span>
        </div>
        <p className="text-2xl font-bold text-gray-700">{data.daysLeft}</p>
        <p className="text-sm text-gray-500 mt-1">Until next month</p>
      </div>
    </div>
  </div>
);

const SpendingByCategory = ({ categories }) => {
  const data = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        data: categories.map((cat) => cat.amount),
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)', // primary
          'rgba(16, 185, 129, 0.8)', // secondary
          'rgba(249, 115, 22, 0.8)', // orange
          'rgba(239, 68, 68, 0.8)', // red
          'rgba(139, 92, 246, 0.8)', // purple
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    cutout: '70%',
  };

  return (
    <div className="card mt-6">
      <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

const RecentTransactions = ({ transactions }) => (
  <div className="card mt-6">
    <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={transaction.icon}
                    alt={transaction.service}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {transaction.service}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${transaction.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Budget = () => {
  const [budgetData, setBudgetData] = useState({
    totalBudget: 2840.0,
    expenses: 1860.0,
    daysLeft: 12,
  });

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([
    { name: 'Entertainment', amount: 450 },
    { name: 'Productivity', amount: 380 },
    { name: 'Utilities', amount: 280 },
    { name: 'Other', amount: 750 },
  ]);

  useEffect(() => {
    // TODO: Fetch budget data from backend
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Budget</h1>
        <button className="btn-primary">Update budget</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <BudgetOverview data={budgetData} />
          <SpendingByCategory categories={categories} />
        </div>
        <div>
          <RecentTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Budget; 