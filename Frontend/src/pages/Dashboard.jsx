import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import DashboardIcon from '../assets/Dashboard.png.jpg';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [upcomingRenewals, setUpcomingRenewals] = useState([]);

  useEffect(() => {
    // Fetch subscriptions data
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/subscriptions');
        setSubscriptions(response.data);
        
        // Calculate total spending
        const total = response.data.reduce((acc, sub) => acc + sub.amount, 0);
        setTotalSpending(total);

        // Get upcoming renewals
        const upcoming = response.data
          .filter(sub => {
            const renewalDate = new Date(sub.nextRenewal);
            const today = new Date();
            const daysUntilRenewal = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
            return daysUntilRenewal <= 7;
          })
          .sort((a, b) => new Date(a.nextRenewal) - new Date(b.nextRenewal));
        
        setUpcomingRenewals(upcoming);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <Sidebar />
      
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <img src={DashboardIcon} alt="Dashboard" className="w-8 h-8 object-contain" />
            <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          </div>
          <Link
            to="/add-subscription"
            className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            Add new subscription
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-white/80 mb-1">Total subscriptions</h3>
            <p className="text-2xl font-bold text-white">{subscriptions.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-white/80 mb-1">Monthly spendings</h3>
            <p className="text-2xl font-bold text-white">${totalSpending.toFixed(2)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-white/80 mb-1">Next renewal</h3>
            <p className="text-2xl font-bold text-white">
              {upcomingRenewals[0]?.nextRenewal ? 
                new Date(upcomingRenewals[0].nextRenewal).toLocaleDateString() : 
                'No upcoming renewals'}
            </p>
          </div>
        </div>

        {/* Upcoming Renewals */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Upcoming Renewals</h2>
          <div className="space-y-4">
            {upcomingRenewals.map((sub) => (
              <div key={sub._id} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    {sub.icon || '🔄'}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{sub.name}</h3>
                    <p className="text-sm text-white/70">{sub.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">${sub.amount}/month</p>
                  <p className="text-sm text-white/70">
                    Renews {new Date(sub.nextRenewal).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {upcomingRenewals.length === 0 && (
              <p className="text-white/70 text-center py-4">No upcoming renewals in the next 7 days</p>
            )}
          </div>
        </div>

        {/* Recent Subscriptions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Active Subscriptions</h2>
            <Link to="/subscriptions" className="text-white/80 hover:text-white">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {subscriptions.slice(0, 5).map((sub) => (
              <div key={sub._id} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    {sub.icon || '🔄'}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{sub.name}</h3>
                    <p className="text-sm text-white/70">{sub.category}</p>
                  </div>
                </div>
                <p className="font-medium text-white">${sub.amount}/month</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
