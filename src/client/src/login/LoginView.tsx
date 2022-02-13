import React from 'react';
import theme from '../assets/theme';
import { ThemeProvider } from '@mui/material/styles';


function LoginView() {
  return (
    <ThemeProvider theme={theme}>
      <div>
      Login page
      </div>
    </ThemeProvider>
  );
}

export default LoginView;
