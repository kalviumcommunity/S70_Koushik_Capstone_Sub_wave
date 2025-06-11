import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    // Clear any existing auth data when accessing public routes
    if (!token && !user) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userAvatar');
      localStorage.removeItem('userName');
    }
  }, [token, user]);
  
  if (token && user) {
    // FIX: Redirect to dashboard if already authenticated
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Outlet />;
};

export default PublicRoute; 