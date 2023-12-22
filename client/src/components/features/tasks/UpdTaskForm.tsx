import React, { useEffect, useState } from 'react';
import { updTask } from './tasksSlice';
import { Task } from './type';
import { useAppDispatch } from '../../../store/store';

function UpdTaskForm({ task }: { task: Task }): JSX.Element {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadLine] = useState(task.deadline);
  const dispatch = useAppDispatch();

  const update: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const deadlineNumb = Number(deadline);
    dispatch(updTask({ task, title, description, deadlineNumb }));
    /*     setTitle('');
    setDescription('');
    setDeadLine(''); */
  };


  return (
    <div className="task__upd">
      <div className="inputsWithForm">
        <form className="updTask-form" onSubmit={update}>
          <div className="inputsOnly">
            <div className="singleInputStyle">
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="singleInputStyle">
              <input
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="singleInputStyle">
              <input
                name="deadline"
                value={deadline}
                onChange={(e) => setDeadLine(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <button className="upd-button" type="submit">
            Подтвердить изменение
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdTaskForm;
