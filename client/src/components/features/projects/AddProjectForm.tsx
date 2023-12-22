import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { addProject } from './projectsSlice';
import './styles/AddForm.css';
import UsersList from '../users/UsersList';
import { User } from '../users/type';
import vector_close from '../../../imgs/png-transparent-computer-icons-close-button-trademark-logo-sign-thumbnail.png';
import { useNavigate } from 'react-router-dom';

function AddProjectForm({ close }: { close: () => void }): JSX.Element {
  const navigate = useNavigate();
  const [nameProject, setName] = useState('');
  const dispatch = useAppDispatch();
  const users = useAppSelector((store) => store.users.users);
  const userSession = useAppSelector((store) => store.auth.user);
  const [addUsers, setAddUsers] = useState<User[]>([]);
  const arrUsers = [...users].filter((el) => userSession?.id !== el.id);
  const [newUsers, setNewUsers] = useState<User[]>(arrUsers);
  const addUser = (user: User): void => {
    setAddUsers([...addUsers, user]);
    setNewUsers(newUsers.filter((el) => el.id !== user.id));
  };
  const delUser = (user: User): void => {
    setAddUsers(addUsers.filter((el) => el.id !== user.id));
    setNewUsers([...newUsers, user]);
  };

  const onHandleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(addProject({ nameProject, addUsers }));
    setName('');
    setAddUsers([]);
    close();
    navigate('/tasks');
  };

  return (
    <div className="modalAdd">
      <div className="modal_container">
        <img src={vector_close} className="button cross" onClick={close} alt="Закрыть окно" />
        <form className="form__add_project" onSubmit={onHandleSubmit}>
          <label className="modal__input">
            Название:
            <input
              className="input"
              value={nameProject}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </label>
          <div className="toAddUsers">
            <UsersList
              addUsers={addUsers}
              newUsers={newUsers}
              delUser={delUser}
              addUser={addUser}
              statusTask ={false}
            />
          </div>
          <button className="add__button" type="submit">
            Добавить проект
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProjectForm;
