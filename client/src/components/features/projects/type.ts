import { User } from '../users/type';

export type Project = {
  id: number;
  name_project: string;
  admin_id: number;
  CommentProjects: CommentProject[];
};

export type ProjectsState = {
  projects: Project[];
  error: string | undefined;
};

export type AddProject = {
  nameProject: string;
  addUsers: User[];
};

export type CommentProject = {
  User: User;
  id: number;
  projectId: number;
  userId: number;
  message: string;
};

export type AddComment = {
  projectId: number | undefined;
  message: string;
}