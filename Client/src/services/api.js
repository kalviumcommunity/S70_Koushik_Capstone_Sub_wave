import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
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
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  googleLogin: (data) => api.post('/auth/google', data),
  validate2FA: (data) => api.post('/auth/validate-2fa', data),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
<<<<<<< HEAD
  // TODO: Implement these endpoints in backend
  // forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  // resetPassword: (token, password) =>
  //   api.post('/auth/reset-password', { token, password }),
};

// User API (alias for auth API methods)
export const userAPI = {
  updateProfile: (data) => api.put('/auth/profile', data),
  // TODO: Implement these endpoints in backend
  // changePassword: (data) => api.put('/auth/change-password', data),
  // updatePreferences: (data) => api.put('/auth/preferences', data),
=======
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) =>
    api.post('/auth/reset-password', { token, password }),
};

// User API
export const userAPI = {
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  updatePreferences: (data) => api.put('/auth/preferences', data),
>>>>>>> be25477 (Implemented google)
};

// Subscription API
export const subscriptionAPI = {
  getAll: () => api.get('/subscriptions'),
  getById: (id) => api.get(`/subscriptions/${id}`),
  create: (data) => api.post('/subscriptions', data),
  update: (id, data) => api.put(`/subscriptions/${id}`, data),
  delete: (id) => api.delete(`/subscriptions/${id}`),
  inviteCollaborator: (data) => api.post('/subscriptions/invite-collaborator', data),
  updateCollaboratorRole: (data) => api.post('/subscriptions/update-collaborator-role', data),
  removeCollaborator: (data) => api.post('/subscriptions/remove-collaborator', data),
  getActivityLogs: (subscriptionId) => api.get(`/subscriptions/${subscriptionId}/activity-logs`),
  getMonthlyAnalytics: () => api.get('/subscriptions/analytics/monthly'),
  getCategoryAnalytics: () => api.get('/subscriptions/analytics/category'),
  getBudgetSuggestions: () => api.get('/subscriptions/analytics/suggestions'),
  uploadFile: (formData) => api.post('/subscriptions/upload-file', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getFiles: (subscriptionId) => api.get(`/subscriptions/${subscriptionId}/files`),
<<<<<<< HEAD
  // TODO: Implement these endpoints in backend
  // share: (id, userData) => api.post(`/subscriptions/${id}/share`, userData),
  // removeShare: (id, userId) =>
  //   api.delete(`/subscriptions/${id}/share/${userId}`),
};

// TODO: Implement these APIs when backend endpoints are ready
// Budget API
// export const budgetAPI = {
//   getStats: () => api.get('/budget/stats'),
//   getHistory: () => api.get('/budget/history'),
//   setBudget: (data) => api.post('/budget', data),
//   updateBudget: (data) => api.put('/budget', data),
// };

// Notification API
// export const notificationAPI = {
//   getAll: () => api.get('/notifications'),
//   markAsRead: (id) => api.put(`/notifications/${id}/read`),
//   updatePreferences: (preferences) =>
//     api.put('/notifications/preferences', preferences),
// };
=======
  share: (id, userData) => api.post(`/subscriptions/share`, { subscriptionId: id, ...userData }),
  removeShare: (id, userId) =>
    api.delete(`/subscriptions/${id}/share/${userId}`),
  getShared: () => api.get('/subscriptions/shared'),
};

// Budget API
export const budgetAPI = {
  getStats: () => api.get('/budget/stats'),
  getHistory: () => api.get('/budget/history'),
  setBudget: (data) => api.post('/budget', data),
  updateBudget: (data) => api.put('/budget', data),
};

// Notification API
export const notificationAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/mark-all-read'),
  updatePreferences: (preferences) =>
    api.put('/notifications/preferences', preferences),
  delete: (id) => api.delete(`/notifications/${id}`),
};
>>>>>>> be25477 (Implemented google)

export default api; 