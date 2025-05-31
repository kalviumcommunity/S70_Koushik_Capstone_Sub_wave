import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import subwaveImage from '../assets/subwave-image.png'; // adjust the path if needed

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log(res.data);

      // Save token in localStorage
      localStorage.setItem('token', res.data.token);

      alert('Login successful!');
      navigate('/dashboard'); // Redirect after login
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed!');
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
          <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              Log In
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">Create one</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
