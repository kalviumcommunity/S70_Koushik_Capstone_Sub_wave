import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import { authAPI } from '../../services/api';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import subwaveMain from '../../assets/Subwave-image.png';
import subwaveBg from '../../assets/Background png.jpg';
import Sparkle from 'react-sparkle';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [otp, setOtp] = useState('');
  const [pendingLogin, setPendingLogin] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loginStart());
    try {
      const response = await authAPI.login(formData);
      dispatch(loginSuccess(response.data));
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.status === 206) {
        setShow2FA(true);
        setPendingLogin({ ...formData });
        toast('2FA required. Please enter your code.');
      } else {
        dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
        toast.error(error.response?.data?.message || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authAPI.validate2FA({ email: pendingLogin.email, token: otp });
      dispatch(loginSuccess(response.data));
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid 2FA code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await authAPI.googleLogin({ token: credentialResponse.credential });
      dispatch(loginSuccess(response.data));
      toast.success('Google login successful!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.status === 206) {
        setShow2FA(true);
        setPendingLogin({ googleToken: credentialResponse.credential });
        toast('2FA required. Please enter your code.');
      } else {
        toast.error('Google login failed');
      }
    }
  };

  const handleGoogle2FASubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authAPI.googleLogin({ token: pendingLogin.googleToken, otp });
      dispatch(loginSuccess(response.data));
      toast.success('Google login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid 2FA code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${subwaveBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="glass-morphism p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8 relative">
            <motion.img
              src={subwaveMain}
              alt="SubWave Main"
              className="h-24 mx-auto mb-4 drop-shadow-lg rounded-xl object-cover"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <Sparkle color="#fbbf24" count={18} minSize={7} maxSize={12} fadeOutSpeed={20} />
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
            <p className="text-white/80">Sign in to manage your subscriptions</p>
          </div>

          <form onSubmit={show2FA ? (pendingLogin?.googleToken ? handleGoogle2FASubmit : handle2FASubmit) : handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition-all duration-200 shadow-sm rounded-lg px-4 py-3 w-full"
                required
                autoComplete="email"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition-all duration-200 shadow-sm rounded-lg px-4 py-3 w-full pr-12"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-yellow-400 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001C3.226 16.273 7.355 19.5 12 19.5c1.658 0 3.237-.336 4.646-.94M21.07 15.977A10.45 10.45 0 0022.066 12c-1.292-4.272-5.421-7.5-10.066-7.5-1.226 0-2.406.218-3.504.617M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.857-.67 1.67-1.17 2.414M15.54 15.54A5.978 5.978 0 0112 17c-3.314 0-6-2.686-6-6 0-.795.155-1.552.437-2.25" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-violet-600 :underline hover:text-purple-400  text-sm">Forgot password?</Link>
            </div>
            {show2FA && (
              <div>
                <input
                  type="text"
                  placeholder="Enter 2FA code"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="input-field bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition-all duration-200 shadow-sm rounded-lg px-4 py-3 w-full"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full button-primary bg-indigo-400 text-black font-bold hover:bg-indigo-600 transition-all duration-200 flex items-center justify-center h-12 rounded-lg shadow-md mt-2"
            >
              {isLoading ? (
                <ThreeDots color="black" height={24} width={24} />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-white/30"></div>
            <span className="mx-4 text-white/60 font-semibold">or</span>
            <div className="flex-grow border-t border-white/30"></div>
          </div>

          <div className="flex flex-col gap-2">
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google login failed')}
                width={300}
                theme="filled_black"
                shape="pill"
                text="signin_with"
              />
            </GoogleOAuthProvider>
          </div>

          <p className="text-center mt-6 text-white/80">
            Don't have an account?{' '}
            <Link to="/register" className="text-white hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;