import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddProject, ProjectsState } from './type';
import * as api from './api';

export const initialState: ProjectsState = { projects: [], error: '' };

export const projectsInit = createAsyncThunk('projects/init', () =>
  api.initProjectsFetch()
);

export const addProject = createAsyncThunk('projects/add', (project:AddProject) =>
  api.addProjectFetch(project)
);

export const projectsDel = createAsyncThunk('projects/del', (id: number) =>
  api.delProjectFetch(id)
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(projectsInit.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(projectsInit.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(projectsDel.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== Number(action.payload)
        );
      })
      .addCase(projectsDel.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export default projectsSlice.reducer;
