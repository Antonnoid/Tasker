import React from 'react';
import { CommentProject } from '../projects/type';
import { RootState, useAppDispatch } from '../../../store/store';
import { delComments } from './CommentsSlice';
import './styles/CommentCard.css';
import { useSelector } from 'react-redux';

const CommentCard = ({
  CommentProject,
}: {
  CommentProject: CommentProject;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);
  const delTask = (): void => {
    dispatch(delComments(CommentProject.id));
  };
  return (
    <div className="commentCard">
      <div className="chat_comment">
        <div className="comment-message">{CommentProject.message}</div>
        <div className="comment-user">{CommentProject.User?.name}</div>
      </div>
      {user?.id === CommentProject.userId && (
        <button className="comment-button" type="button" onClick={delTask}>
          X
        </button>
      )}
    </div>
  );
};

export default CommentCard;
