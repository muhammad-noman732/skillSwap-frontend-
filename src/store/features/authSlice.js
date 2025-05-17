import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      console.log('Setting credentials with:', action.payload);
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
        console.log('Auth state after update:', state);
      } else {
        console.warn('Attempted to set credentials with null/undefined payload');
      }
    },
    clearCredentials: (state) => {
      console.log('Clearing credentials');
      state.user = null;
      state.isAuthenticated = false;
      console.log('Auth state after clearing:', state);
    }
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;