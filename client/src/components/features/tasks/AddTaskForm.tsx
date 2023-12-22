import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { tasksAdd } from './tasksSlice';
import './styles/Tasks.css';
import '../projects/styles/Projects.css';
import vector_close from '../../../imgs/png-transparent-computer-icons-close-button-trademark-logo-sign-thumbnail.png';
import { User } from '../users/type';
import UserCardTask from '../users/UserCardTask';
import UsersList from '../users/UsersList';

function AddTaskForm({ close }: { close: () => void }): JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [statusTask, setStatusTask] = useState(false);
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const users = useAppSelector((store) => store.users.users);
  const [addUsers, setAddUsers] = useState<User[]>([]);
  const arrUsers: User[] | undefined = [...users].filter(
    (el) =>
      el.UserProjects.filter((elem) => elem.project_id === Number(projectId))
        .length > 0
  );
  const [newUsers, setNewUsers] = useState<User[]>(arrUsers);
  const addUser = (user: User): void => {
    setAddUsers([...addUsers, user]);
    setNewUsers(newUsers.filter((el) => el.id !== user.id));
    setStatusTask(true);
  };
  const delUser = (user: User): void => {
    setAddUsers(addUsers.filter((el) => el.id !== user.id));
    setNewUsers([...newUsers, user]);
    setStatusTask(false);
  };

  const newDeadline = Number(deadline);

  const addTask: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    dispatch(
      tasksAdd({
        title,
        description,
        deadline: newDeadline,
        project_id: Number(projectId),
        user_id: addUsers[0].id,
      })
    );
    setTitle('');
    setDescription('');
    setDeadline('');
    close();
  };
  return (
    <div className="modalAdd">
      <div className="modal_container">
        <img
          src={vector_close}
          className="button cross"
          onClick={close}
          alt="Закрыть окно"
        />
        <div className="task__add">
          <form className="task__addForm" onSubmit={addTask}>
            <label className="modal__input_task">
              Название:
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Заголовок"
              />
            </label>
            <label className="modal__input_task_area">
              Описание:
              <textarea
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Описание задачи"
              />
            </label>
            <label className="modal__input_task">
              Срок исполнения:
              <input
                type="text"
                name="deadline"
                onChange={(e) => setDeadline(e.target.value)}
                value={deadline}
                placeholder="Срок исполнения"
              />
            </label>
            <div className="toAddUsers">
              <UsersList
                addUsers={addUsers}
                newUsers={newUsers}
                delUser={delUser}
                addUser={addUser}
                statusTask={statusTask}
              />
            </div>
            <button className="add__button" type="submit">
              Добавить задачу
            </button>
          </form>
          <div className="users__inTask">
          <h3>В проекте: </h3>
          {arrUsers.map((user) => (
            <UserCardTask user={user} key={user.id} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaskForm;
