// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';
import SubwaveImage from '../assets/Subwave-image.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      await auth.forgotPassword(email);
      setStatus('success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process request');
      setStatus('error');
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${SubwaveImage})` }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white bg-opacity-90 p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Reset Password</h2>
        
        {status === 'success' ? (
          <div className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="text-gray-600 mb-6">
              If an account exists with this email, you will receive password reset instructions.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300 ${
                status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Reset Link'}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Remember your password?{' '}
              <span
                onClick={() => navigate('/login')}
                className="text-indigo-700 cursor-pointer font-medium"
              >
                Sign In
              </span>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
