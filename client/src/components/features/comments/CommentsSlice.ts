import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentsState } from './type';
import * as api from './api';
import { AddComment } from '../projects/type';

export const initialState: CommentsState = { comments: [], error: '' };

export const commentsInit = createAsyncThunk(
  'comments/init',
  (projectId: string) => api.initCommentsFetch(projectId)
);

export const commentsAdd = createAsyncThunk(
  'projects/commentAdd',
  (comment: AddComment) => api.addCommentFetch(comment)
);

export const delComments = createAsyncThunk('comments/del', (projectId: number) =>
  api.delCommentFetch(projectId)
);
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(commentsInit.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(commentsInit.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(commentsAdd.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(commentsAdd.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(delComments.fulfilled, (state, action) => {
        state.comments = state.comments.filter((el) => el.id !== Number(action.payload));
      })
      .addCase(delComments.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
