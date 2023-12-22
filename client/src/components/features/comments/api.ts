import { AddComment, CommentProject } from '../projects/type';
import { Message } from '../tasks/type';

export const initCommentsFetch = async (
  projectId: string
): Promise<CommentProject[]> => {
  const res = await fetch(`/api/tasks/${projectId}/comments`);
  const data = await res.json();
  return data;
};

export const addCommentFetch = async (
  comment: AddComment
): Promise<CommentProject> => {
  const res = await fetch(`/api/tasks/${comment.projectId}/comments`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      projectId: comment.projectId,
      message: comment.message,
    }),
  });
  const data = await res.json();
  return data;
};

export const delCommentFetch = async (projectId: number): Promise<Message> => {
  const res = await fetch(`/api/tasks/${projectId}/del`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};
