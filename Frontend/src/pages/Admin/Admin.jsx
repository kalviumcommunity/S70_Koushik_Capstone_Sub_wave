import React, { useState, useEffect } from 'react';
import {
  UserGroupIcon,
  CogIcon,
  DocumentIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Icon className="h-8 w-8 text-primary-500" />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-2xl font-semibold text-primary-600">{value}</p>
      </div>
    </div>
  </div>
);

const UserRow = ({ user, onEdit, onDelete }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="h-10 w-10 flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={user.avatar || 'https://via.placeholder.com/40'}
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        user.role === 'Admin' ? 'bg-red-100 text-red-800' :
        user.role === 'Manager' ? 'bg-yellow-100 text-yellow-800' :
        'bg-green-100 text-green-800'
      }`}>
        {user.role}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {user.lastActive}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button
        onClick={() => onEdit(user)}
        className="text-primary-600 hover:text-primary-900 mr-4"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(user)}
        className="text-red-600 hover:text-red-900"
      >
        Delete
      </button>
    </td>
  </tr>
);

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalSubscriptions: 0,
    revenue: 0,
  });

  useEffect(() => {
    // TODO: Fetch users and stats from backend
    setUsers([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        lastActive: '2 hours ago',
        avatar: 'https://via.placeholder.com/40',
      },
      // Add more mock data as needed
    ]);

    setStats({
      totalUsers: 1234,
      activeUsers: 892,
      totalSubscriptions: 567,
      revenue: 45678,
    });
  }, []);

  const handleEditUser = (user) => {
    // TODO: Implement edit user functionality
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (user) => {
    // TODO: Implement delete user functionality
    console.log('Delete user:', user);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={UserGroupIcon}
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={CogIcon}
        />
        <StatCard
          title="Total Subscriptions"
          value={stats.totalSubscriptions}
          icon={DocumentIcon}
        />
        <StatCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={ShieldCheckIcon}
        />
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">User Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin; 