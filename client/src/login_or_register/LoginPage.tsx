import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import LoginForm from '../components/login-form';
import theme from '../assets/theme';

function LoginView() {
  return (
    <ThemeProvider theme={theme}>
      <LoginForm />
    </ThemeProvider>
  );
}

export default LoginView;
