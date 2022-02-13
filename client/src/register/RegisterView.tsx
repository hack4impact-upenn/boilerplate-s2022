import React from 'react';
import theme from '../assets/theme';
import { ThemeProvider } from '@mui/material/styles';


function RegisterView() {
  return (
   
      <ThemeProvider theme={theme}>
        <div>
          Register page
        </div>
      </ThemeProvider>
      
  );
}

export default RegisterView;
