import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import subscriptionReducer from '../features/subscriptions/subscriptionSlice';
import budgetReducer from '../features/budget/budgetSlice';
<<<<<<< HEAD
=======
import notificationReducer from '../features/notifications/notificationSlice';
>>>>>>> be25477 (Implemented google)

// Redux store configuration
export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscriptions: subscriptionReducer,
    budget: budgetReducer,
<<<<<<< HEAD
=======
    notifications: notificationReducer,
>>>>>>> be25477 (Implemented google)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 