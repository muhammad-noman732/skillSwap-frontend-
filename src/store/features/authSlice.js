import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  // token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      console.log('Setting credentials with:', action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      // state.token = null;
      state.isAuthenticated = false;
    }
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
