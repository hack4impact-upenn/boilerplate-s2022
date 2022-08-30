import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Link } from '@mui/material';
import {
  MiniLinkText,
  FormField,
  FormGridCol,
  FormHeaderText,
  ScreenGrid,
} from '../components/grid';
import { emailInputIsValid } from './inputValidation';
import { sendResetPasswordEmail } from './api';
import AlertDialog from '../components/alertDialog';

/**
 * A page allowing users to input their email so a reset password link can be
 * sent to them
 */
function ResetPasswordEmailPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailErrorExists] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const alertTitle = 'Error';
  const navigate = useNavigate();

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  async function sendResetEmail() {
    if (emailInputIsValid(email, setEmailErrorExists, setEmailErrorMessage)) {
      sendResetPasswordEmail(email)
        .then(() => {
          navigate('/');
        })
        .catch((e) => {
          setAlertMessage(e.message);
          setShowAlert(true);
        });
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
        <FormField>
          <MiniLinkText>
            Back to{' '}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </MiniLinkText>
        </FormField>
      </FormGridCol>
      {/* The alert that pops up */}
      <AlertDialog
        showAlert={showAlert}
        title={alertTitle}
        message={alertMessage}
        onClose={handleAlertClose}
      />
    </ScreenGrid>
  );
}

export default ResetPasswordEmailPage;
