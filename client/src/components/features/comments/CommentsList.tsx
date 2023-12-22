import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store/store';
import CommentCard from './CommentCard';
import { useParams } from 'react-router';
import { commentsInit } from './CommentsSlice';
import { commentsAdd } from './CommentsSlice';
import './styles/CommentsList.css';

const CommentsList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const comments = useSelector((store: RootState) => store.comments.comments);
  useEffect(() => {
    if (projectId) {
      const intervalId = setInterval(() => {
        dispatch(commentsInit(projectId));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);
  const [comment, setComment] = useState('');

  const addNewComment = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(
      commentsAdd({
        projectId: Number(projectId),
        message: comment,
      })
    );
    setComment('');
  };
  return (
    <div className='CommentsList'>
      <div className='chat_title'>
        <h3>чат проекта</h3>
      </div>
      <form className='chat_form' onSubmit={addNewComment}>
        <input
          className='chat_input'
          type='text'
          name='comment'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder='Новый комментарий'
        />
        <button className='addCommentBTN' type='submit'>Добавить комментарий</button>
      </form>
      <div className='chat_commentCard'>
        {comments.map((CommentProject) => (
          <CommentCard
            CommentProject={CommentProject}
            key={CommentProject.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
