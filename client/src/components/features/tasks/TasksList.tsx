import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import TaskCard from './TaskCard';

function TasksList(): JSX.Element {
  const tasks = useSelector((store: RootState) => store.tasks.tasks);

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}

export default TasksList;
