import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../../store/store';
import { tasksInit, updTaskStatus } from '../tasks/tasksSlice';
import TaskCard from '../tasks/TaskCard';
import AddTaskForm from '../tasks/AddTaskForm';
import UserCardTask from '../users/UserCardTask';
import { User } from '../users/type';
import CommentsList from '../comments/CommentsList';
import { authCheckUser } from '../auth/authSlice';
import { loadUsers } from '../users/usersSlice';


function ProjectPage(): JSX.Element {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const tasks = useSelector((store: RootState) => store.tasks.tasks);
  const users = useSelector((store: RootState) => store.users.users);
  const projects = useSelector((store: RootState) => store.projects.projects);
  // const user = useSelector((store: RootState) => store.auth.user);
  const [projectTotalLength, setProjectTotalLength] = useState(0);

  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const tasksLength = useMemo(() => tasks.map((el) => el.deadline), [tasks]);

  let hours: number, minutes: number, days: number;

  const timeCalc = (a: number[]): void => {
    const total = a.reduce((acc, cur) => acc + cur, 0);
    if (total % 60 === 0) {
      hours = total / 60;
    }
    if (total % 60 != 0) {
      hours = total / 60;
      minutes = total % 60;
    }
    let hoursShort;
    days = 0;
    if (hours > 8) {
      days = hours / 8;
      hoursShort = hours % 8;
      hours = hoursShort;
    }
    days = Math.round(days);
    hours = Math.round(hours);
    minutes = Math.round(minutes);
  };

  const calculatedTotalTime = useMemo(() => timeCalc(tasksLength), [tasks]);

  useEffect(() => {
    setDay(days);
    setHour(hours);
    setMinute(minutes);
  }, [tasks]);

  useEffect(() => {
    if (projectId) {
      const intervalId = setInterval(() => {
        dispatch(tasksInit(projectId));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [projects, users]);

  const usersInProject: User[] = useMemo(
    () =>
      users.filter(
        (el) =>
          el.UserProjects.filter(
            (elem) => elem.project_id === Number(projectId)
          ).length > 0
      ),
    [users]
  );

  useEffect(() => {
    dispatch(authCheckUser());
    dispatch(loadUsers());
  }, []);

  // useEffect(() => {
  //   if (projectId) {
  //     dispatch(tasksInit(projectId));
  //   }
  // }, [projects, users]);

  const [state, setState] = useState(false);

  const close = (): void => {
    setState((prev) => !prev);
  };

  const open = (): void => {
    setState((prev) => !prev);
  };

  function handleOnDrop(e: React.DragEvent): void {
    const taskData = e.dataTransfer.getData('id');

    const updTaskS = tasks.find((t) => t.id === +taskData);

    if (e.currentTarget.className === 'tasks tasks_0') {
      dispatch(updTaskStatus({ ...updTaskS!, status: 'Предстоящие' }));
    } else if (e.currentTarget.className === 'tasks tasks_1') {
      dispatch(updTaskStatus({ ...updTaskS!, status: 'Выполняются' }));
    } else {
      dispatch(updTaskStatus({ ...updTaskS!, status: 'Завершены' }));
    }
  }

  function handleDragOver(e: React.DragEvent): void {
    e.preventDefault();
  }

  // if (!user) {
  //   navigate('/')
  // }

  return (
    <div>
      <div className="users__inProject">
        <h3>В проекте: </h3>
        {usersInProject.map((user) => (
          <UserCardTask user={user} key={user.id} />
        ))}
      </div>
      <div className="users__inProject">
        <div className="table">
          <h3>Общая продолжительность проекта: </h3>
          <table>
            <tr>
              <th>Дни</th>
              <th>Часы</th>
              <th>Минуты</th>
            </tr>
            <tr>
              <td>{day}</td>
              <td>{hour}</td>
              <td>{minute}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="boardsContainer">
        <div
          className="tasks tasks_0"
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
        >
          <div className="tasks_title">
            <h1>Предстоящие</h1>
          </div>
          <div className="projectCard__in">
            <button type="button" className="button__modal_in" onClick={open}>
              <p className="add__text_in">Добавить задачу</p>
            </button>
            {state && <AddTaskForm close={close} />}
          </div>
          {tasks
            .filter((el) => el.status === 'Предстоящие')
            .map((task) => {
              return <TaskCard task={task} key={task.id} />;
            })}
        </div>
        <div
          className="tasks tasks_1"
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
        >
          <div className="tasks_title">
            <h1>Выполняются</h1>
          </div>
          {tasks
            .filter((el) => el.status === 'Выполняются')
            .map((task) => {
              return <TaskCard task={task} key={task.id} />;
            })}
        </div>
        <div
          className="tasks tasks_2"
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
        >
          <div className="tasks_title">
            <h1>Завершены</h1>
          </div>
          {tasks
            .filter((el) => el.status === 'Завершены')
            .map((task) => {
              return <TaskCard task={task} key={task.id} />;
            })}
        </div>
        <CommentsList />
      </div>
    </div>
  );
}

export default React.memo(ProjectPage);
