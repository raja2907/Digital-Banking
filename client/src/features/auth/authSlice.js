import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const res = await axios.post('http://localhost:5000/api/users/login', credentials);
  return res.data;
});

export const registerUser = createAsyncThunk('auth/register', async (data) => {
  const res = await axios.post('http://localhost:5000/api/users/register', data);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, loading: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
