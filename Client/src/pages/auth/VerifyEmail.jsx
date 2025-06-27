import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { motion } from 'framer-motion';

const VerifyEmail = () => {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }
    const verify = async () => {
      try {
        await authAPI.verifyEmail(token);
        setStatus('success');
        setMessage('Email verified successfully! You can now sign in.');
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed.');
      }
    };
    verify();
  }, [location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-8 shadow-md max-w-md w-full text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p className={`mb-6 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
        {status === 'success' && (
          <button
            className="button-primary w-full"
            onClick={() => navigate('/login')}
          >
            Go to Sign In
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail; 