import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const auth = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  verifyEmail: (token) => api.get(`/auth/verify/${token}`),
  checkVerification: (email) => api.post('/auth/check-verification', { email }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password })
};

// User API
export const users = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  deleteAccount: () => api.delete('/users/profile'),
  getAllUsers: () => api.get('/users/all')
};

// Subscription API
export const subscriptions = {
  getAll: () => api.get('/subscriptions'),
  add: (subscriptionData) => api.post('/subscriptions', subscriptionData),
  update: (id, subscriptionData) => api.put(`/subscriptions/${id}`, subscriptionData),
  delete: (id) => api.delete(`/subscriptions/${id}`),
  sendReminder: (id) => api.post(`/subscriptions/${id}/remind`)
};

export default api; 