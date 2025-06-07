import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import SubwaveImage from '../assets/Subwave-image.png';

const VerifyEmail = () => {
  const [status, setStatus] = useState('verifying');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = new URLSearchParams(location.search).get('token');
        if (!token) {
          setStatus('error');
          return;
        }

        const response = await axios.get(`/api/auth/verify-email/${token}`);
        
        if (response.data.expired) {
          setStatus('expired');
        } else if (response.data.success) {
          setStatus('success');
          // Show success message for 3 seconds before redirecting
          setTimeout(() => {
            navigate('/signin', {
              state: { 
                message: 'Registration successful! Your email has been verified. Please sign in to continue.',
                verified: true
              }
            });
          }, 3000);
        }
      } catch (error) {
        if (error.response?.data?.expired) {
          setStatus('expired');
        } else {
          setStatus('error');
        }
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${SubwaveImage})` }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white bg-opacity-90 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center"
      >
        {status === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-800">Verifying your email...</h2>
            <p className="text-gray-600 mt-2">Please wait while we verify your email address.</p>
          </>
        )}

        {status === 'success' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-2">Your email has been successfully verified.</p>
            <p className="text-gray-600">Redirecting you to sign in...</p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-green-500 h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {status === 'expired' && (
          <>
            <div className="text-red-500 text-5xl mb-4">⚠</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Verification Link Expired</h2>
            <p className="text-gray-600 mb-6">The verification link has expired. Please register again.</p>
            <button
              onClick={() => navigate('/signup')}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
            >
              Back to Sign Up
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-red-500 text-5xl mb-4">✕</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Verification Failed</h2>
            <p className="text-gray-600 mb-6">There was an error verifying your email.</p>
            <button
              onClick={() => navigate('/signup')}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
            >
              Back to Sign Up
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail; 