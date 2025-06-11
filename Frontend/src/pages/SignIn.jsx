import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../services/api';
import SubwaveImage from '../assets/Background.jpg';
// import WelcomeAnimation from '../components/WelcomeAnimation'; // Animation temporarily disabled for reliability

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Attempt login
      const res = await auth.login({ email, password });
      // Ensure token and user are present
      if (res.data.token && res.data.user) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        // Immediately redirect to dashboard (bypassing animation)
        navigate('/dashboard');
      } else {
        setError('Login failed: Invalid response from server.');
      }
    } catch (err) {
      if (err.response?.data?.requiresVerification) {
        // If email needs verification, redirect to verification pending page
        navigate('/verification-pending', {
          state: {
            email: email,
            message: err.response.data.message
          }
        });
        return;
      }
      setError(err.response?.data?.message || 'An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="relative">
      <div
        className="flex justify-center items-center min-h-screen bg-opacity-80 bg-cover bg-center shadow-lg bg- relative overflow-hidden"
        style={{ backgroundImage: `url(${SubwaveImage})` }}
      >
        <div className='absolute inset-0 bg-black opacity-40 z-0'/> 
        <div
          className="relative z-10 bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Welcome Back</h2>
          {/* Success Message */}
          {location.state?.message && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
              {location.state.message}
            </div>
          )}
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              id="email"
              type="email"
              placeholder="Enter your Gmail address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition block mx-auto duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            > 
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-300"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-5">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-purple-700 cursor-pointer font-medium"
            >
              Sign Up
            </span>
          </p>
          <p
            className="text-center text-sm text-purple-600 mt-2 cursor-pointer hover:underline"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
