import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import {
  FormField,
  FormGridCol,
  FormHeaderText,
  ScreenGrid,
} from '../components/grid';
import { EmailValidation } from './inputValidation';
import { sendResetPasswordEmail } from './api';

function ResetPasswordEmailPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function sendEmail() {
    await EmailValidation(email, setError);
    if (error === 'badEmail') {
      alert('Invalid email');
    } else {
      sendResetPasswordEmail(email);
      navigate('/');
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
            id="email"
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
            onClick={() => sendEmail()}
          >
            Send Reset Link
          </Button>
        </FormField>
      </FormGridCol>
    </ScreenGrid>
  );
}

export default ResetPasswordEmailPage;
