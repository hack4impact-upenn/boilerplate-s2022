import React, { useState } from 'react';
import { Link, TextField, Button } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import theme from '../assets/theme';
import { RegisterValidation } from './inputValidation';
import ErrorMessage from './errorMessage';

import {
  MiniLinkText,
  FormHeaderText,
  ScreenGrid,
  FormGridCol,
  FormGridRow,
  FormField,
} from '../components/StyledComponents';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function onSubmit() {
    const result = await RegisterValidation(
      email,
      password1,
      password2,
      setError,
    );
    if (result === '') {
      alert(email + password1);
      navigate('/');
    } else {
      alert('fail');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ScreenGrid>
        <FormGridCol>
          <FormField>
            <FormHeaderText>
              We are so excited to have you on board!
            </FormHeaderText>
          </FormField>
          <FormField>
            <TextField
              error={error === 'empty'}
              helperText={<ErrorMessage error={error} />}
              size="small"
              type="text"
              required
              label="First Name"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
          </FormField>
          <FormField>
            <TextField
              error={error === 'empty'}
              helperText={<ErrorMessage error={error} />}
              size="small"
              type="text"
              required
              label="Last Name"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </FormField>
          <FormField>
            <TextField
              error={
                error === 'empty' ||
                error === 'badEmail' ||
                error === 'duplicate'
              }
              helperText={<ErrorMessage error={error} />}
              size="small"
              type="email"
              required
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>
          <FormField>
            <TextField
              error={error === 'empty' || error === 'mismatch'}
              helperText={<ErrorMessage error={error} />}
              size="small"
              type="password"
              required
              label="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </FormField>
          <FormField>
            <TextField
              error={error === 'empty' || error === 'mismatch'}
              helperText={<ErrorMessage error={error} />}
              size="small"
              type="password"
              required
              label="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </FormField>
          <FormGridRow>
            <FormField>
              <MiniLinkText>
                Back to{' '}
                <Link component={RouterLink} to="/login">
                  Login
                </Link>
              </MiniLinkText>
            </FormField>
            <FormField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => onSubmit()}
              >
                Signup
              </Button>
            </FormField>
          </FormGridRow>
        </FormGridCol>
      </ScreenGrid>
    </ThemeProvider>
  );
}

export default RegisterPage;
