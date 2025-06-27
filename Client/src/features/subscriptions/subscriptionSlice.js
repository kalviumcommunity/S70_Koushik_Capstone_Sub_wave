import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptions: [],
  isLoading: false,
  error: null,
  filters: {
    category: 'all',
    sortBy: 'date',
    searchQuery: '',
  },
  categories: [
    'Streaming',
    'Productivity',
    'Finance',
    'Entertainment',
    'Education',
    'Other'
  ],
};

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    fetchSubscriptionsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSubscriptionsSuccess: (state, action) => {
      state.isLoading = false;
      state.subscriptions = action.payload;
    },
    fetchSubscriptionsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addSubscription: (state, action) => {
      state.subscriptions.push(action.payload);
    },
    updateSubscription: (state, action) => {
      const index = state.subscriptions.findIndex(
        (sub) => sub._id === action.payload._id
      );
      if (index !== -1) {
        state.subscriptions[index] = action.payload;
      }
    },
    deleteSubscription: (state, action) => {
      state.subscriptions = state.subscriptions.filter(
        (sub) => sub._id !== action.payload
      );
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchSubscriptionsStart,
  fetchSubscriptionsSuccess,
  fetchSubscriptionsFailure,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  setFilters,
  clearError,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer; 