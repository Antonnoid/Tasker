import React from 'react';
import UserCard from './UserCard';
import './styles/UsersList.css';
import { User } from './type';

function UsersList({
  addUsers,
  newUsers,
  addUser,
  delUser,
  statusTask,
}: {
  addUsers: User[];
  newUsers: User[];
  addUser: (user: User) => void;
  delUser: (user: User) => void;
  statusTask: boolean;
}): JSX.Element {
  return (
    <div className="toUsers">
      <div className="addUsers">
        <h2>Участники</h2>
        <div className="user__list">
          {addUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              delUser={delUser}
              addUser={addUser}
              status="false"
            />
          ))}
        </div>
      </div>
      {!statusTask && (
        <div className="Users user__list">
          {newUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              delUser={delUser}
              addUser={addUser}
              status="true"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersList;
