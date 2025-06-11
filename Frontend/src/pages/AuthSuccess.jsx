import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WelcomeAnimation from '../components/WelcomeAnimation';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(user));
        // Store auth data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(parsedUser));
        setUserData(parsedUser);
        setShowWelcome(true);
      } catch (error) {
        console.error('Error processing auth data:', error);
        navigate('/login');
      }
    } else {
      // If no token/user, redirect to login
      navigate('/login');
    }
  }, [navigate, location]);

  const handleAnimationComplete = () => {
    navigate('/dashboard');
  };

  if (showWelcome && userData) {
    return (
      <WelcomeAnimation
        username={userData.name}
        onComplete={handleAnimationComplete}
      />
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-900 to-indigo-900">
      <div className="bg-white p-8 rounded-3xl shadow-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Processing your login...</p>
      </div>
    </div>
  );
};

export default AuthSuccess; 