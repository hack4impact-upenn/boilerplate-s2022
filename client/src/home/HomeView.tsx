import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../util/redux/hooks';
import {
  logout as logoutAction,
  toggleAdmin,
  selectUser,
} from '../util/redux/slice';
import { logout as logoutApi, selfUpgrade } from './api';

interface PromoteButtonProps {
  admin: boolean | null;
  handleSelfPromote: () => void;
  navigator: NavigateFunction;
}

function PromoteButton({
  admin,
  handleSelfPromote,
  navigator,
}: PromoteButtonProps) {
  if (admin === null) {
    return null;
  }
  return !admin ? (
    <Button onClick={handleSelfPromote}>Promote self to admin</Button>
  ) : (
    <Button onClick={() => navigator('/users', { replace: true })}>
      View all users
    </Button>
  );
}

function HomeView() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [admin, setAdmin] = useState(user.admin);
  const logoutDispatch = () => dispatch(logoutAction());
  const handleLogout = async () => {
    if (await logoutApi(logoutDispatch)) {
      navigator('/login', { replace: true });
    }
  };

  const handleSelfPromote = async () => {
    const newAdminStatus = await selfUpgrade(user.email as string);
    if (newAdminStatus) {
      dispatch(toggleAdmin());
      setAdmin(true);
    }
  };

  return (
    <div>
      <div>
        Welcome to the boilerplate, {user.firstName} {user.lastName}
      </div>
      <Button onClick={handleLogout}>Logout</Button>
      <PromoteButton
        admin={admin}
        handleSelfPromote={handleSelfPromote}
        navigator={navigator}
      />
    </div>
  );
}

export default HomeView;
