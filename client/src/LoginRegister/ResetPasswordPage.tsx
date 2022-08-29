import React, { useState } from 'react';
import { TextField, Link, Button } from '@mui/material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { ResetValidation } from './inputValidation';
import {
  MiniLinkText,
  FormHeaderText,
  ScreenGrid,
  FormGridCol,
  FormField,
} from '../components/grid';
import { resetPassword } from './api';

function ResetPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { token } = useParams();
  console.log(`token in frontend is ${token}`);
  const navigate = useNavigate();

  async function makeResetCall() {
    const result = await ResetValidation(password, confirmPassword, setError);
    if (result === '') {
      const successful = await resetPassword(
        password,
        token || `missing token`,
      );
      if (successful) {
        navigate('/');
      } else {
        alert('fail');
      }
    } else {
      alert('fail');
    }
  }

  return (
    <ScreenGrid>
      <FormGridCol>
        <FormField>
          <FormHeaderText>Reset your Password.</FormHeaderText>
        </FormField>
        <FormField>
          <TextField
            error={error === 'empty' || error === 'badPassword'}
            id="login-text"
            type="password"
            required
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <FormField>
          <TextField
            error={error === 'empty' || error === 'mismatch'}
            id="login-text"
            type="password"
            required
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormField>
        <FormField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => makeResetCall()}
          >
            Reset Password
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
      </FormGridCol>
    </ScreenGrid>
  );
}

export default ResetPage;
