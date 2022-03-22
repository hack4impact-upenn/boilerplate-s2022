import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Typography, Grid } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { ForgotValidation } from './inputValidation';
import ErrorMessage from './errorMessage';
import { MiniLinkText, FormHeaderText,  ScreenGrid, FormGridCol, FormGridRow, FormField, SubmitButton } from '../components/StyledComponents'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function onSubmit() {
    const result = await ForgotValidation(email, setError);
    if (result === '') {
      alert(email);
      navigate('/');
    } else {
      alert('fail');
    }
  }
  async function onLogin() {
    navigate('/login');
  }

  return (
    <ScreenGrid>
      <FormGridCol>
        <FormField>
        <FormHeaderText> Forgot Password?</FormHeaderText>
        </FormField>
        <FormField>
        <TextField
        error={error === 'empty' || error === 'accountDNE'}
        helperText={<ErrorMessage error={error} />}
        id="login-text"
        type="email"
        required
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
        </FormField>
      <FormGridRow>
        <FormField>
        <MiniLinkText>
        <Link component={RouterLink} to="/login">
          Login
        </Link>
      </MiniLinkText>
        </FormField>
      <FormField>
      <SubmitButton
        onClick={() => onSubmit()}
      >
        Send Recovery Email
      </SubmitButton>
      </FormField>
      </FormGridRow>
      <FormField>
      <MiniLinkText>
        Need an account?{' '}
        <Link component={RouterLink} to="/register">
          Sign up
        </Link>
      </MiniLinkText>
      </FormField>
      </FormGridCol>
    </ScreenGrid>
  );
}

export default ForgotPasswordPage;
