import { Project } from "../projects/type";
import { Task } from "../tasks/type";

export type User = {
  id: number;
  name: string;
  photo: string;
  password: string;
  email: string;
  Projects: Project[];
  Tasks: Task[];
  UserProjects: UserProjects[];
};

export type UserProjects = {
  id: number;
  project_id: number;
  user_id: number;
};

export type usersInProject = {
  id: number;
  name: string;
  photo: string;
  password: string;
  email: string;
  Projects: Project[];
  Tasks: Task[];
  UserProjects: UserProjects[];
};

export type UserId = User['id'];

export type UserAuthReg = {
  name: string;
  email: string;
  password: string;
  cpassword: string;
};

export type UserAuthLog = {
  email: string;
  password: string;
};

export type UsersState = {
  users: User[];
  error: string | undefined;
};


