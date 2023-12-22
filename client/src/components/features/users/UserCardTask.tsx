import React from 'react';
import { User } from './type';
import './styles/UserCard.css';

function UserCardTask({
  user,
}: {
  user: User | undefined;
}): JSX.Element {
  return (
    <div className="user__card_task">
      <div>{user?.name}</div>
      <img src={user?.photo} alt="..." />
    </div>
  );
}

export default UserCardTask;


