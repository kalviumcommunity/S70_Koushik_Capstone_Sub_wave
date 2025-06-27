import { createSlice } from '@reduxjs/toolkit';

// Budget slice for managing budget state
const initialState = {
  budget: {
    total: 1000,
    spent: 0,
    remaining: 1000,
  },
  categories: {
    Streaming: 0,
    Productivity: 0,
    Finance: 0,
    Entertainment: 0,
    Education: 0,
    Other: 0,
  },
  history: [],
  isLoading: false,
  error: null,
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setBudget: (state, action) => {
      state.budget = action.payload;
      state.budget.remaining = state.budget.total - state.budget.spent;
    },
    updateCategory: (state, action) => {
      const { category, amount } = action.payload;
      state.categories[category] = amount;
      // Recalculate total spent
      state.budget.spent = Object.values(state.categories).reduce((sum, val) => sum + val, 0);
      state.budget.remaining = state.budget.total - state.budget.spent;
    },
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setBudget,
  updateCategory,
  addToHistory,
  setLoading,
  setError,
  clearError,
} = budgetSlice.actions;

export default budgetSlice.reducer; 