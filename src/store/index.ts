import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import countriesReducer from './countriesSlice';

export const store = configureStore({
  reducer: { users: usersReducer, coutries: countriesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
