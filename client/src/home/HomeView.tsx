import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/theme';
import { logout } from './api';

function HomeView() {
  return (
    <div>
      <div>Welcome to the Boilerplate</div>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
}

export default HomeView;
