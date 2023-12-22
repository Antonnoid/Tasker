import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import tasksSlice from '../components/features/tasks/tasksSlice';
import projectsSlice from '../components/features/projects/projectsSlice';
import authSlice from '../components/features/auth/authSlice';
import usersSlice from '../components/features/users/usersSlice';
import ProjectsMateSlice from '../components/features/projects/ProjectsMateSlice';
import CommentsSlice from '../components/features/comments/CommentsSlice';

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    projects: projectsSlice,
    auth: authSlice,
    users: usersSlice,
    projectsMate: ProjectsMateSlice,
    comments: CommentsSlice
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(fn: (state: RootState) => T) => T =
  useSelector;

export type RootState = ReturnType<typeof store.getState>;

export default store;
