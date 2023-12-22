import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearError, registration } from './authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import './styles/authAndRegistr.css';

function Registration(): JSX.Element {
  const { error, user } = useAppSelector((store) => store.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onHadleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(registration({ name, email, password, cpassword }));
    dispatch(clearError());
  };

  const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    dispatch(clearError());
  };

  useEffect(() => {
    dispatch(clearError());
    if (user) {
      navigate('/tasks');
    }
  }, [user, navigate]);

  return (
    <div className="form__container">
      {error && <span style={{ fontSize: '25px', color: 'red' }}>{error}</span>}
      <form onSubmit={onHadleSubmit} className="form__add_user">
        <label className="form__label">
          Имя
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
        </label>
        <label className="form__label">
          Email
          <input value={email} onChange={handleChangeEmail} type="text" />
        </label>
        <label className="form__label">
          Пароль
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
        </label>
        <label className="form__label">
          Повторите пароль
          <input value={cpassword} onChange={(e) => setCpassword(e.target.value)} type="text" />
        </label>
        <button type="submit">Регистрация</button>
      </form>
    </div>
  );
}

export default Registration;
