import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Error from '../features/404/Error';
import ProjectsList from '../features/projects/ProjectsList';
import ProjectPage from '../features/projects/ProjectPage';
import Registration from '../features/auth/Registration';
import Authorization from '../features/auth/Authorization';
import Menu from '../features/navigation/Menu';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { authCheckUser, stopPending } from '../features/auth/authSlice';
// import TaskPage from '../features/tasks/TaskPage';
import MainPage from '../features/main/MainPage';
import { loadUsers } from '../features/users/usersSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pending } = useAppSelector((store) => store.auth);

  useEffect(() => {
    dispatch(authCheckUser());
    dispatch(loadUsers());
  }, []);

  useEffect(() => {
    setTimeout(() => dispatch(stopPending()), 2000);
  }, [pending]);

  return (
    <>
      <div className="App" />
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<MainPage />} />
          <Route path="/tasks" element={<ProjectsList />} />
          <Route path="/tasks/:projectId" element={<ProjectPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/authorization" element={<Authorization />} />
        </Route>
        {/* <Route path="/tasks/:projectId/tasks/:taskId" element={<TaskPage />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
