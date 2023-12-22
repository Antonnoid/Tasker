import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task, TaskUpd, TasksState } from './type';
import * as api from './api';

export const initialState: TasksState = { tasks: [], error: '' };

export const tasksInit = createAsyncThunk('tasks/init', (projectId: string) =>
  api.initTasksFetch(projectId)
);

export const updTask = createAsyncThunk('tasks/upd', (taskUpd: TaskUpd) =>
  api.updTasksFetch(taskUpd)
);

export const tasksDel = createAsyncThunk('tasks/del', (id: number) =>
  api.delTaskFetch(id)
);

export const updTaskStatus = createAsyncThunk(
  'tasks/upd/status',
  (task: Task) => api.updTaskStatusFetch(task)
);
export const tasksAdd = createAsyncThunk('tasks/add', (task: Partial<Task>) =>
  api.addTaskFetch(task)
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updTaskStatus.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload;
          }
          return el;
        });
      })
      .addCase(updTaskStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(tasksInit.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(tasksInit.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload;
          }
          return el;
        });
      })
      .addCase(updTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(tasksDel.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== Number(action.payload)
        );
      })
      .addCase(tasksDel.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(tasksAdd.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(tasksAdd.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
