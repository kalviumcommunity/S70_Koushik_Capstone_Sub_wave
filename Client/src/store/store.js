import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import subscriptionReducer from '../features/subscriptions/subscriptionSlice';
import budgetReducer from '../features/budget/budgetSlice';

// Redux store configuration
export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscriptions: subscriptionReducer,
    budget: budgetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 