import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import UpdTaskForm from './UpdTaskForm';
import { tasksDel } from './tasksSlice';
import { Task } from './type';
import './styles/Tasks.css';
import vector_close from '../../../imgs/png-transparent-computer-icons-close-button-trademark-logo-sign-thumbnail.png';

function TaskPage({
  task,
  close,
}: {
  task: Task;
  close: () => void;
}): JSX.Element {

  return (
    <div className="modalAdd">
      <div className="modal_container">
        <img
          src={vector_close}
          className="button cross"
          onClick={close}
          alt="Закрыть окно"
        />
        <UpdTaskForm task={task} />
     {/*    <div className="taskpageContainer">
          <div>{task.title}</div>
          <div>{task.description}</div>
          <div>{task.deadline}</div>
          <div>{task.user_id}</div> */}
      {/*     <button type="button" onClick={delTask}>
            Удалить задачу
          </button> */}
      {/*     <input name="comment" placeholder="comment" /> */}
        </div>
      </div>
  /*   </div> */
  );
}

export default TaskPage;
