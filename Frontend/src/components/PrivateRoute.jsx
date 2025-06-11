import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // FIX: Use <Outlet /> for nested routing to ensure protected routes render correctly
  return <Outlet />;
};

export default PrivateRoute; 