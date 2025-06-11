import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { subscriptions } from '../services/api';

const Subscriptions = () => {
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await subscriptions.getAll();
      setSubscriptionsData(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setError('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await subscriptions.delete(id);
        fetchSubscriptions();
      } catch (error) {
        console.error('Error deleting subscription:', error);
      }
    }
  };

  const filteredAndSortedSubscriptions = subscriptionsData
    .filter(sub => {
      if (filter === 'all') return true;
      if (filter === 'upcoming') {
        const renewalDate = new Date(sub.nextRenewal);
        const today = new Date();
        const daysUntilRenewal = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
        return daysUntilRenewal <= 7;
      }
      return sub.category.toLowerCase() === filter.toLowerCase();
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'amount':
          return b.amount - a.amount;
        case 'renewal':
          return new Date(a.nextRenewal) - new Date(b.nextRenewal);
        default:
          return 0;
      }
    });

  const totalSpending = subscriptionsData.reduce((acc, sub) => acc + sub.amount, 0);
  const upcomingRenewals = subscriptionsData.filter(sub => {
    const renewalDate = new Date(sub.nextRenewal);
    const today = new Date();
    const daysUntilRenewal = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilRenewal <= 7;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading subscriptions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
              <p className="text-gray-600 mt-1">Manage your digital subscriptions</p>
            </div>
            <Link
              to="/add-subscription"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Subscription
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Subscriptions</h3>
              <p className="text-2xl font-bold text-gray-900">{subscriptionsData.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Monthly Spending</h3>
              <p className="text-2xl font-bold text-gray-900">${totalSpending.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Upcoming Renewals</h3>
              <p className="text-2xl font-bold text-gray-900">{upcomingRenewals.length}</p>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex space-x-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Subscriptions</option>
                  <option value="upcoming">Upcoming Renewals</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="productivity">Productivity</option>
                  <option value="education">Education</option>
                  <option value="health">Health & Fitness</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="name">Name</option>
                  <option value="amount">Amount</option>
                  <option value="renewal">Renewal Date</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subscriptions List */}
          <div className="bg-white rounded-xl shadow-sm">
            {filteredAndSortedSubscriptions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions found</h3>
                <p className="text-gray-600 mb-4">
                  {filter === 'all' 
                    ? "You haven't added any subscriptions yet."
                    : "No subscriptions match your current filter."
                  }
                </p>
                {filter === 'all' && (
                  <Link
                    to="/add-subscription"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Add Your First Subscription
                  </Link>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredAndSortedSubscriptions.map((subscription) => {
                  const renewalDate = new Date(subscription.nextRenewal);
                  const today = new Date();
                  const daysUntilRenewal = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
                  const isUpcoming = daysUntilRenewal <= 7;

                  return (
                    <div key={subscription._id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">{subscription.icon || '📱'}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{subscription.name}</h3>
                            <p className="text-sm text-gray-500">{subscription.category}</p>
                            <p className="text-sm text-gray-500">
                              {subscription.billingCycle} • {subscription.paymentMethod}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-gray-900">${subscription.amount}/month</p>
                            <p className={`text-sm ${isUpcoming ? 'text-red-600' : 'text-gray-500'}`}>
                              Renews {renewalDate.toLocaleDateString()}
                              {isUpcoming && ` (${daysUntilRenewal} days)`}
                            </p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {/* TODO: Edit subscription */}}
                              className="px-3 py-1 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(subscription._id)}
                              className="px-3 py-1 text-sm border border-red-300 rounded-lg text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions; 