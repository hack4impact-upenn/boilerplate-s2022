/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface UserState {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  admin: boolean | null;
}

interface Payload {
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
}

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
} as UserState;

/**
 * A slice of the redux store that contains the user's information. This slice defines reducer for logging in a user, logging out a user, and promoting a user to admin.
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Payload>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.admin = action.payload.admin;
    },
    toggleAdmin: (state) => {
      state.admin = !state.admin;
    },
    logout: (state) => {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.admin = null;
    },
  },
});

export const { login, logout, toggleAdmin } = userSlice.actions;
export default userSlice.reducer;

/**
 * A selector that returns the user state
 * @param state The redux store state
 * @returns The user state
 */
export const selectUser = (state: RootState) => state.user;
