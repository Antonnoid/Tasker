/* eslint-disable  */
import { Message } from '../tasks/type';
import { AddProject, Project } from './type';

export const initProjectsFetch = async (): Promise<Project[]> => {
  const res = await fetch('/api/tasks');
  const data = await res.json();
  return data;
};

export const addProjectFetch = async (project: AddProject): Promise<Project> => {
  const res = await fetch('/api/tasks/project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  const data = await res.json();
  return data;
};

export const delProjectFetch = async (projectId: number): Promise<Message> => {
  const res = await fetch(`/api/tasks/${projectId}/delete`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

export const initProjectsMateFetch = async (): Promise<Project[]> => {
  const res = await fetch('/api/tasks/mate');
  const data = await res.json();
  return data;
};
