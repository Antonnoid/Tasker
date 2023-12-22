import React from 'react';
import './styles/Navigation.scss';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { logOut } from '../auth/authSlice';

function Navigation(): JSX.Element {
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleLogOut: React.MouseEventHandler<HTMLAnchorElement> = async (e): Promise<void> => {
    e.preventDefault();
    dispatch(logOut());
    navigate('/');
  };
  return (
    <>
      <div className="nav__container container">
        <ul className="nav__menu">
          <li className="nav__item">
            <NavLink className="nav__button" to="/">
              Главная
            </NavLink>
          </li>
          {!user ? (
            <>
              <li>
                <NavLink className="nav__button" to="/registration">
                  Регистрация
                </NavLink>
              </li>
              <li>
                <NavLink className="nav__button" to="/authorization">
                  Войти
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="nav__button" to="/tasks">
                  Проекты
                </NavLink>
              </li>
              <li className="nav__user_hello">
                Привет, {user?.name} {'  '}
                <img className="nav__user_photo" src={user?.photo} alt="" />
              </li>
              <li>
                <a onClick={onHandleLogOut} className="nav__button" href="/">
                  Выйти
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
      
    </>
  );
}

export default Navigation;
