import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
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
    // Redirect to dashboard if already authenticated
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default PublicRoute; 