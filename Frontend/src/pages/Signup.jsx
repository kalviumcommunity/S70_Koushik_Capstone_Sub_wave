import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import subwaveImage from '../assets/subwave-image.png'; // Adjust path if needed

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      console.log(res.data);
      alert('Signup Successful!');
    } catch (err) {
      console.error(err);
      alert('Signup Failed!');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-blue-100 flex flex-col justify-center items-center p-10">
        <img src={subwaveImage} alt="SubWave Illustration" className="w-auto h-auto" />
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

          {/* Social Auth Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="flex-1 border p-2 rounded flex items-center justify-center hover:bg-gray-100">
              <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" className="mr-2" />
              Sign up with Google
            </button>
            <button className="flex-1 border p-2 rounded flex items-center justify-center hover:bg-gray-100">
              <img src="https://img.icons8.com/ios-filled/24/1877f2/facebook-new.png" alt="Facebook" className="mr-2" />
              Sign up with Facebook
            </button>
          </div>

          <div className="text-center text-gray-500 mb-6">- OR -</div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
            >
              Create Account
            </button>
          </form>

          {/* Link to Login */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
