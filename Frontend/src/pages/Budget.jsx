import React, { useState } from 'react';
import BudgetIcon from '../assets/Budget.png.jpg';

const Budget = () => {
  const [budget, setBudget] = useState({
    total: 2500.00,
    spent: 1860.00,
    daysLeft: 12
  });

  const [transactions] = useState([
    { id: 1, name: 'Netflix', amount: -14.99, date: '2024-02-15' },
    { id: 2, name: 'Spotify', amount: -9.99, date: '2024-02-15' },
    { id: 3, name: 'Adobe', amount: -52.99, date: '2024-02-14' },
  ]);

  const percentageSpent = (budget.spent / budget.total) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <img src={BudgetIcon} alt="Budget" className="w-8 h-8 object-contain" />
            <h1 className="text-2xl font-bold text-white">Budget</h1>
          </div>
          <button
            onClick={() => {}}
            className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            Add expense
          </button>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Expense Dashboard</h2>
            
            <div className="space-y-6">
              {/* Budget Progress */}
              <div>
                <div className="flex justify-between text-sm text-white/80 mb-2">
                  <span>Total Budget: ${budget.total.toFixed(2)}</span>
                  <span>${budget.spent.toFixed(2)} spent</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white/30 transition-all duration-500"
                    style={{ width: `${percentageSpent}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-white/80">{budget.daysLeft} days left</span>
                  <span className="text-white/80">{percentageSpent.toFixed(1)}% vs last month</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={() => {}}
                  className="flex-1 px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5"
                >
                  Update budget
                </button>
                <button
                  onClick={() => {}}
                  className="flex-1 px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5"
                >
                  View all
                </button>
              </div>
            </div>
          </div>

          {/* Spending Overview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Spending by category</h2>
            <div className="space-y-4">
              {/* Category Bars */}
              {[
                { name: 'Entertainment', amount: 850, percentage: 45 },
                { name: 'Productivity', amount: 450, percentage: 24 },
                { name: 'Education', amount: 350, percentage: 19 },
                { name: 'Other', amount: 210, percentage: 12 },
              ].map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between text-sm text-white/80 mb-1">
                    <span>{category.name}</span>
                    <span>${category.amount}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/30"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-1 bg-white/5 border border-white/20 rounded-lg text-sm text-white">
                <option>All transactions</option>
                <option>Subscriptions</option>
                <option>One-time</option>
              </select>
              <select className="px-3 py-1 bg-white/5 border border-white/20 rounded-lg text-sm text-white">
                <option>This month</option>
                <option>Last month</option>
                <option>Last 3 months</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-white/80 border-b border-white/10">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="text-white">
                    <td className="py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="py-3">{transaction.name}</td>
                    <td className="py-3 text-right text-red-300">
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget; 