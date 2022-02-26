import React from 'react';
import theme from '../assets/theme';
import { ThemeProvider } from '@mui/material/styles';
import SignUpForm from '../components/signup-form';



function RegisterView() {
  return (
    <SignUpForm />
  );
}

export default RegisterView;
