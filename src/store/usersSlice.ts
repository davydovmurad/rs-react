import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type User = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'M' | 'F';
  picture?: string;
  country: string;
};

export interface UsersState {
  users: User[];
  isNew: boolean;
}

const initialState: UsersState = {
  users: [],
  isNew: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.isNew = true;
    },
    disableIsNew: (state) => {
      state.isNew = false;
    },
  },
});

export const { addUser, disableIsNew } = usersSlice.actions;

export default usersSlice.reducer;
