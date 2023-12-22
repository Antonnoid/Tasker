import React from 'react';
import { User } from './type';
import './styles/UserCard.css';

function UserCard({
  user,
  addUser,
  delUser,
  status,
}: {
  user: User;
  addUser: (user: User) => void;
  delUser: (user: User) => void;
  status: string;
}): JSX.Element {
  return (
    <div className="user__card">
      <div>{user.name}</div>
      <img src={user.photo} alt="..." />
      {status === 'true' ? (
        <button onClick={() => addUser(user)} type="button">
          добавить
        </button>
      ) : (
        <button onClick={() => delUser(user)} type="button">
          удалить
        </button>
      )}
    </div>
  );
}

export default UserCard;


