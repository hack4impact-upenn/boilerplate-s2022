import React, { useState } from 'react';
import { TextField, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { LoginValidation } from './inputValidation';
import ErrorMessage from './errorMessage';
import {
  MiniLinkText,
  FormHeaderText,
  ScreenGrid,
  FormGridCol,
  FormGridRow,
  FormField,
  SubmitButton,
} from '../components/StyledComponents';

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function onSubmit() {
    const result = await LoginValidation(email, password, setError);
    if (result === '') {
      alert(email + password);
      navigate('/');
    } else {
      alert('fail');
    }
  }

  return (
    <ScreenGrid>
      <FormGridCol>
        <FormField>
          <FormHeaderText>Welcome! Lets get started.</FormHeaderText>
        </FormField>
        <FormField>
          <TextField
            error={
              error === 'empty' || error === 'badEmail' || error === 'fail'
            }
            helperText={<ErrorMessage error={error} />}
            type="email"
            required
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField>
          <TextField
            error={error === 'empty' || error === 'fail'}
            helperText={<ErrorMessage error={error} />}
            type="password"
            required
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <FormGridRow>
          <FormField>
            <MiniLinkText>
              <Link component={RouterLink} to="/forgot">
                Forgot password?
              </Link>
            </MiniLinkText>
          </FormField>
          <FormField>
            <SubmitButton onClick={() => onSubmit()}>Login</SubmitButton>
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

export default LoginView;
