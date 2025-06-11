import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptions: [],
  loading: false,
  error: null,
  stats: {
    totalAmount: 0,
    monthlySpending: 0,
    yearlySpending: 0,
    categoryBreakdown: {}
  }
};

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.subscriptions = action.payload;
      state.error = null;
      // Calculate statistics
      state.stats = calculateStats(action.payload);
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSubscription: (state, action) => {
      state.subscriptions.push(action.payload);
      state.stats = calculateStats(state.subscriptions);
    },
    updateSubscription: (state, action) => {
      const index = state.subscriptions.findIndex(sub => sub._id === action.payload._id);
      if (index !== -1) {
        state.subscriptions[index] = action.payload;
        state.stats = calculateStats(state.subscriptions);
      }
    },
    deleteSubscription: (state, action) => {
      state.subscriptions = state.subscriptions.filter(sub => sub._id !== action.payload);
      state.stats = calculateStats(state.subscriptions);
    },
    clearSubscriptions: (state) => {
      state.subscriptions = [];
      state.loading = false;
      state.error = null;
      state.stats = {
        totalAmount: 0,
        monthlySpending: 0,
        yearlySpending: 0,
        categoryBreakdown: {}
      };
    }
  }
});

// Helper function to calculate subscription statistics
const calculateStats = (subscriptions) => {
  const stats = {
    totalAmount: 0,
    monthlySpending: 0,
    yearlySpending: 0,
    categoryBreakdown: {}
  };

  subscriptions.forEach(sub => {
    // Calculate amounts based on billing cycle
    const monthlyAmount = sub.billingCycle === 'monthly' ? sub.amount :
      sub.billingCycle === 'quarterly' ? sub.amount / 3 :
      sub.billingCycle === 'yearly' ? sub.amount / 12 : 0;

    stats.monthlySpending += monthlyAmount;
    stats.yearlySpending += monthlyAmount * 12;
    stats.totalAmount += sub.amount;

    // Update category breakdown
    if (!stats.categoryBreakdown[sub.category]) {
      stats.categoryBreakdown[sub.category] = 0;
    }
    stats.categoryBreakdown[sub.category] += monthlyAmount;
  });

  return stats;
};

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  clearSubscriptions
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer; 