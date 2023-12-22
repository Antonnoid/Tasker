import { Task, TaskUpd, Message } from './type';

export const initTasksFetch = async (projectId: string): Promise<Task[]> => {
  const res = await fetch(`/api/tasks/${projectId}`);
  const data = await res.json();
  return data;
};

export const updTasksFetch = async (taskUpd: TaskUpd): Promise<Task> => {
  const res = await fetch(`/api/tasks/${taskUpd.task.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title: taskUpd.title,
      description: taskUpd.description,
      deadline: taskUpd.deadlineNumb,
    }),
  });
  const data = await res.json();
  return data;
};

export const delTaskFetch = async (taskId: number): Promise<Message> => {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

export const updTaskStatusFetch = async (task: Task): Promise<Task> => {
  const res = await fetch(`/api/tasks/drag/${task.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      type: 1,
      status: task.status,
    }),
  });
  const data = await res.json();
  return data;
};

export const addTaskFetch = async (task: Partial<Task>): Promise<Task> => {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      userId: task.user_id,
      project_id: task.project_id,
    }),
  });
  const data = await res.json();
  return data;
};
