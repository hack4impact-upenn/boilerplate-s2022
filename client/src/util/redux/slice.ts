/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
}

const initialState = {
  isAuthenticated: false,
  email: null,
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.email = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
