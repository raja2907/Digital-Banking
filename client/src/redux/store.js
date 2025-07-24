import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { loggerMiddleware } from './loggerMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
