import React, { useState } from 'react';
import { TextField, Link, Button } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { ResetValidation } from './inputValidation';
import ErrorMessage from './errorMessage';
import {
  MiniLinkText,
  FormHeaderText,
  ScreenGrid,
  FormGridCol,
  FormGridRow,
  FormField,
} from '../components/StyledComponents';

function ResetPage() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function onSubmit() {
    const result = await ResetValidation(
      email,
      oldPassword,
      newPassword,
      setError,
    );
    if (result === '') {
      alert(email + oldPassword);
      navigate('/');
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
          <TextField
            error={error === 'empty' || error === 'badPassword'}
            id="login-text"
            type="password"
            required
            label="Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </FormField>
        <FormField>
          <TextField
            error={error === 'empty' || error === 'mismatch'}
            id="login-text"
            type="password"
            required
            label="Confirm Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
              Reset Password
            </Button>
          </FormField>
        </FormGridRow>
      </FormGridCol>
    </ScreenGrid>
  );
}

export default ResetPage;
