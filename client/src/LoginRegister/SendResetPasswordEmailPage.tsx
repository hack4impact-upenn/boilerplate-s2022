import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import {
  FormField,
  FormGridCol,
  FormHeaderText,
  ScreenGrid,
} from '../components/grid';
import { emailInputIsValid } from './inputValidation';
import { sendResetPasswordEmail } from './api';

function ResetPasswordEmailPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const navigate = useNavigate();

  async function sendResetEmail() {
    if (emailInputIsValid(email, setEmailError, setEmailErrorMessage)) {
      sendResetPasswordEmail(email)
        .then(() => {
          navigate('/');
        })
        .catch((e) => alert(e.message));
    }
  }

  return (
    <ScreenGrid>
      <FormGridCol>
        <FormField>
          <FormHeaderText>Reset your password</FormHeaderText>
        </FormField>
        <FormField>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            type="Email"
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
        </FormField>
        <FormField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => sendResetEmail()}
          >
            Send Reset Link
          </Button>
        </FormField>
      </FormGridCol>
    </ScreenGrid>
  );
}

export default ResetPasswordEmailPage;
