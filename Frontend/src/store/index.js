import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscriptions: subscriptionReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store; 