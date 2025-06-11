import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscriptions } from '../services/api';

const AddSubscription = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Entertainment',
    amount: '',
    billingCycle: 'Monthly',
    nextRenewal: '',
    notes: '',
    paymentMethod: 'Credit card',
    isCustom: false
  });

  const categories = [
    'Entertainment',
    'Productivity',
    'Health & Fitness',
    'Education',
    'Shopping',
    'Music',
    'Gaming',
    'Other'
  ];

  const billingCycles = ['Monthly', 'Yearly', 'Weekly', 'Custom'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await subscriptions.add(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding subscription:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Add new subscription</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-6">
              {/* Subscription Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Billing Cycle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing cycle
                </label>
                <select
                  name="billingCycle"
                  value={formData.billingCycle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {billingCycles.map(cycle => (
                    <option key={cycle} value={cycle}>
                      {cycle}
                    </option>
                  ))}
                </select>
              </div>

              {/* Next Renewal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next renewal date
                </label>
                <input
                  type="date"
                  name="nextRenewal"
                  value={formData.nextRenewal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment method
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Credit card">Credit card</option>
                  <option value="Debit card">Debit card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank transfer">Bank transfer</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows="3"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save subscription
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubscription; 