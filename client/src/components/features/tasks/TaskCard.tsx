import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Task } from './type';
import { tasksDel, updTask } from './tasksSlice';
import { RootState, useAppDispatch } from '../../../store/store';
import TaskPage from './TaskPage';
import { useSelector } from 'react-redux';
import UserCardTask from '../users/UserCardTask';
import { useNavigate } from 'react-router-dom';
import edit from './styles/download.png';
import './styles/Tasks.css';

function TaskCard({ task }: { task: Task }): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useSelector((store: RootState) => store.users.users);
  const [state, setState] = useState(false);

  const user = users.find((el) => el.id === task.user_id);

  const close = (): void => {
    setState(false);
    //navigate(`/tasks/${task.project_id}`);
  };

  const open = (): void => {
    setState(true);
  };

  const delTask = (): void => {
    dispatch(tasksDel(task.id));
  };

  function handleOnDrag(e: React.DragEvent, taskId: string): void {
    e.dataTransfer.setData('id', taskId);
  }

  const [title, setTitle] = useState(task.title);

  useEffect(() => {
    setTitle(task.title);
  }, [task.title]);

  const handleTaskInput: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    setTitle(e.target.value);
    dispatch(
      updTask({
        task: task,
        title: e.target.value,
        description: task.description,
        deadlineNumb: Number(task.deadline),
      })
    );
  };

  return (
    <div>
      <div
        draggable
        onDragStart={(e) => handleOnDrag(e, `${task.id}`)}
        className={`TaskCard task__${task.status}`}
      >
        <div className="taskCard__delBut">
          <button className="delBut" type="button" onClick={delTask}>
            X
          </button>
          <button className="delBut" type="button" onClick={open}>
            ред.
          </button>
        </div>
        <div className="taskCard__text">
          {/* <form action="" onSubmit={handleTaskInput}> */}
          <input
            onChange={(e) => handleTaskInput(e)}
            className={`input_${task.status}`}
            value={title}
          />
          {/*    </form> */}
        </div>
        <div className="userCardTask__list">
          <UserCardTask user={user} />
        </div>
        {/* <Link className="taskCard-link" to={`/tasks/${task.project_id}/tasks/${task.id}`}>
        <button type="button">Подробнее</button>
      </Link> */}
      </div>
      {state && <TaskPage task={task} close={close} />}
    </div>
  );
}

export default TaskCard;
