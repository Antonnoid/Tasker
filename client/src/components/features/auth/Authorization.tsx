import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { authorization, clearError } from './authSlice';
import './styles/authAndRegistr.css';

function Authorization(): JSX.Element {
  const { error, user } = useAppSelector((store) => store.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onHadleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(authorization({ email, password }));
    dispatch(clearError());
  };

  useEffect(() => {
    dispatch(clearError());
    if (user) {
      navigate('/tasks');
    }
  }, [user, navigate]);

  return (
    <div className="auth_container">
      <div className="form__container">
        {error && <span style={{ fontSize: '25px', color: 'red' }}>{error}</span>}
        <form onSubmit={onHadleSubmit} className="form__add-animal">
          <label className="labelColored">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='cleanInput'/>
          </label>
          <label className="labelColored">
            Пароль
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className='cleanInput'/>
          </label>
          <button type="submit" className="buttonClean">Войти</button>
        </form>
      </div>
    </div>
  );
}

export default Authorization;
