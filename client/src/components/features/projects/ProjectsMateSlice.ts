import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProjectsState } from './type';
import * as api from './api';

export const initialState: ProjectsState = { projects: [], error: '' };

export const projectsMateInit = createAsyncThunk('projectsMate/init', () =>
  api.initProjectsMateFetch()
);

const projectsSlice = createSlice({
  name: 'projectsMate',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(projectsMateInit.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(projectsMateInit.rejected, (state, action) => {
        state.error = action.error.message;
      })
  },
});
export default projectsSlice.reducer;
