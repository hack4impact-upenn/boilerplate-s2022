import React, { useState } from 'react';
import { TextField, Link, Button } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { ForgotValidation } from './inputValidation';
import ErrorMessage from './errorMessage';
import {
  MiniLinkText,
  FormHeaderText,
  ScreenGrid,
  FormGridCol,
  FormField,
} from '../components/StyledComponents';

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
        <FormField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => onSubmit()}
          >
            Send Recovery Email
          </Button>
        </FormField>
        <FormField>
          <MiniLinkText>
            Back to{' '}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </MiniLinkText>
        </FormField>
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
