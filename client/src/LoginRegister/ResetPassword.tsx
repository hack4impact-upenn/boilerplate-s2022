import React, { useState } from 'react';
import { TextField, Link } from '@mui/material';
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
  SubmitButton,
} from '../components/StyledComponents';

function ResetPage() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function onSubmit() {
    const result = await ResetValidation(email, password1, password2, setError);
    if (result === '') {
      alert(email + password1);
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
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </FormField>
        <FormField>
          <TextField
            error={error === 'empty' || error === 'mismatch'}
            id="login-text"
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
              Back to
              <Link component={RouterLink} to="/login">
                Login
              </Link>
            </MiniLinkText>
          </FormField>
          <FormField>
            <SubmitButton onClick={() => onSubmit()}>
              Reset Password
            </SubmitButton>
          </FormField>
        </FormGridRow>
      </FormGridCol>
    </ScreenGrid>
  );
}

export default ResetPage;
