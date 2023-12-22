import { CommentProject } from '../projects/type';

export type CommentsState = {
  comments: CommentProject[];
  error: string | undefined;
};
