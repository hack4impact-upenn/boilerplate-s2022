import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/theme';

function LoginView() {
  return (
    <ThemeProvider theme={theme}>
      <div>Login page</div>
    </ThemeProvider>
  );
}

export default LoginView;
