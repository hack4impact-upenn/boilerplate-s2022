import React, { useState } from 'react';
import { TextField, Link, Button } from '@mui/material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { resetPasswordInputsAreValid } from './inputValidation';
import {
  MiniLinkText,
  FormHeaderText,
  ScreenGrid,
  FormGridCol,
  FormField,
} from '../components/grid';
import { resetPassword } from './api';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState('');

  const { token } = useParams();
  const navigate = useNavigate();

  async function makeResetCall() {
    if (
      resetPasswordInputsAreValid(
        password,
        confirmPassword,
        setPasswordError,
        setConfirmPasswordError,
        setPasswordErrorMessage,
        setConfirmPasswordErrorMessage,
      )
    ) {
      resetPassword(password, token || 'missing token')
        .then(() => {
          navigate('/');
        })
        .catch((e) => {
          alert(e.message); // TODO: change this to a better popup
        });
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
            error={passwordError}
            helperText={passwordErrorMessage}
            type="password"
            required
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <FormField>
          <TextField
            error={confirmPasswordError}
            helperText={confirmPasswordErrorMessage}
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

export default ResetPasswordPage;
