import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/theme';

function RegisterView() {
  return (
    <ThemeProvider theme={theme}>
      <div>Register page</div>
    </ThemeProvider>
  );
}

export default RegisterView;
