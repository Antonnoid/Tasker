import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UsersState } from './type';
import * as api from '../../App/api';

const initialState: UsersState = {
  users: [],
  error: undefined,
};

export const loadUsers = createAsyncThunk('users/loadUsers', () => api.loadUsersFetch());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
