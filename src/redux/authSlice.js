import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInUserAPI, signUpUserAPI, fetchCurrentUserAPI } from '../services/authService';

export const signInUser = createAsyncThunk('auth/sign-in', signInUserAPI);
export const signUpUser = createAsyncThunk('auth/sign-up', signUpUserAPI);
export const fetchCurrentUser = createAsyncThunk('auth/authenticated-user', fetchCurrentUserAPI);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    signOut: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('fullName');
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        if (action.error.message === 'User not authenticated') {
          state.user = null;
          localStorage.removeItem('token');
          localStorage.removeItem('fullName');
        }
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        if (action.error.message === 'User not authenticated') {
          state.user = null;
          localStorage.removeItem('token');
          localStorage.removeItem('fullName');
        }
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
