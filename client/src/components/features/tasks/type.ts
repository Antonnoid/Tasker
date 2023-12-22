export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  deadline: number;
  user_id: number;
  project_id: number;
};

export type Status = {
  status: Task['status'];
};

export type Comment = {
  id: number;
  text: string;
  helpId: number;
  taskId: number;
};

export type Help = {
  id: number;
  userId: number;
  taskId: number;
};

export type TasksState = {
  tasks: Task[];
  error: string | undefined;
};

export type TaskUpd = {
  task: Task;
  title: string;
  description: string;
  deadlineNumb: number;
};

export type Message = {
  message: string;
  id: number;
};
