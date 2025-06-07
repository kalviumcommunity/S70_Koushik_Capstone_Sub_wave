import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SubwaveImage from '../assets/Subwave-image.png';
import axios from 'axios';

const VerificationPending = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkInitialState = () => {
      const stateEmail = location.state?.email;
      const stateMessage = location.state?.message;

      if (!stateEmail) {
        navigate('/signup', { replace: true });
        return;
      }

      setEmail(stateEmail);
      setMessage(stateMessage || '');
      setIsLoading(false);
    };

    checkInitialState();
  }, [location.state, navigate]);

  useEffect(() => {
    let intervalId;

    const startPolling = () => {
      if (email && !isVerified) {
        intervalId = setInterval(async () => {
          try {
            const response = await axios.post('/api/auth/check-verification', { email });
            if (response.data.isVerified) {
              setIsVerified(true);
              clearInterval(intervalId);
              // Redirect to signin after 3 seconds
              setTimeout(() => {
                navigate('/signin', {
                  state: { 
                    message: 'Email verified successfully! You can now sign in.',
                    verified: true
                  },
                  replace: true
                });
              }, 3000);
            }
          } catch (error) {
            console.error('Error checking verification status:', error);
          }
        }, 5000); // Check every 5 seconds
      }
    };

    startPolling();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [email, isVerified, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

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
        {!isVerified ? (
          <>
            <div className="text-indigo-600 text-5xl mb-4">📧</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Check Your Email</h2>
            <p className="text-gray-600 mb-4">
              We've sent a verification link to:
            </p>
            <p className="text-indigo-600 font-medium mb-6">{email}</p>
            <p className="text-gray-600 mb-6">{message}</p>
            
            <div className="space-y-4">
              <button
                onClick={() => window.open('https://mail.google.com', '_blank')}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
              >
                Open Gmail
              </button>
              
              <button
                onClick={() => navigate('/signup', { replace: true })}
                className="w-full py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-md transition duration-300"
              >
                Back to Sign Up
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>Didn't receive the email? Check your spam folder or try signing up again.</p>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Email Verified!</h2>
            <p className="text-gray-600 mb-6">Your email has been successfully verified.</p>
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
      </motion.div>
    </div>
  );
};

export default VerificationPending; 