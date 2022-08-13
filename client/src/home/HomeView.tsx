import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../util/redux/hooks';
import { logout as logoutAction, selectUser } from '../util/redux/slice';
import { logout as logoutApi } from './api';

function HomeView() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const logoutDispatch = () => dispatch(logoutAction());
  const handleLogout = async () => {
    if (await logoutApi(logoutDispatch)) {
      navigator('/login', { replace: true });
    }
  };
  return (
    <div>
      <div>
        Welcome to the boilerplate {user.firstName} {user.lastName}
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default HomeView;
