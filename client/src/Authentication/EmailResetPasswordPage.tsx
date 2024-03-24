import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { TextField, Typography, Link, Grid } from '@mui/material';
import { sendResetPasswordEmail } from './api.ts';
import AlertDialog from '../components/AlertDialog.tsx';
import FormGrid from '../components/form/FormGrid.tsx';
import { emailRegex, InputErrorMessage } from '../util/inputvalidation.ts';
import PrimaryButton from '../components/buttons/PrimaryButton.tsx';
import ScreenGrid from '../components/ScreenGrid.tsx';
import FormCol from '../components/form/FormCol.tsx';

/**
 * A page allowing users to input their email so a reset password link can be
 * sent to them
 */
function EmailResetPasswordPage() {
  // Default values for state
  const defaultShowErrors = {
    email: false,
    alert: false,
  };
  const defaultErrorMessages = {
    email: '',
    alert: '',
  };

  // State values and hooks
  const [email, setEmail] = useState('');
  const [showError, setShowErrorState] = useState(defaultShowErrors);
  const [errorMessage, setErrorMessageState] = useState(defaultErrorMessages);
  const navigate = useNavigate();

  // Helper functions for changing only one field in a state object
  const setErrorMessage = (field: string, msg: string) => {
    setErrorMessageState((prevState) => ({
      ...prevState,
      ...{ [field]: msg },
    }));
  };
  const setShowError = (field: string, show: boolean) => {
    setShowErrorState((prevState) => ({
      ...prevState,
      ...{ [field]: show },
    }));
  };

  const alertTitle = 'Error';
  const handleAlertClose = () => {
    setShowError('alert', false);
  };

  const validateInputs = () => {
    setShowErrorState(defaultShowErrors);
    setErrorMessageState(defaultErrorMessages);

    if (!email) {
      setErrorMessage('email', InputErrorMessage.MISSING_INPUT);
      setShowError('email', true);
      return false;
    }
    if (!email.match(emailRegex)) {
      setErrorMessage('email', InputErrorMessage.INVALID_EMAIL);
      setShowError('email', true);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      sendResetPasswordEmail(email)
        .then(() => {
          navigate('/');
        })
        .catch((e) => {
          setShowError('alert', true);
          setErrorMessage('alert', e.message);
        });
    }
  };

  const title = "Let's get you back";
  return (
    <ScreenGrid>
      <FormGrid>
        <FormCol>
          <Grid item container justifyContent="center">
            <Typography variant="h2">{title}</Typography>
          </Grid>
          <Grid item width="1">
            <TextField
              fullWidth
              value={email}
              error={showError.email}
              helperText={errorMessage.email}
              onChange={(e) => setEmail(e.target.value)}
              type="Email"
              label="Email"
              required
              placeholder="Email Address"
            />
          </Grid>
          <Grid item container justifyContent="center">
            <PrimaryButton
              fullWidth
              type="submit"
              variant="contained"
              onClick={() => handleSubmit()}
            >
              Send Reset Link
            </PrimaryButton>
          </Grid>
          <Grid item container justifyContent="center">
            <Link component={RouterLink} to="../">
              Back to Login
            </Link>
          </Grid>
        </FormCol>
      </FormGrid>
      {/* The alert that pops up */}
      <Grid item>
        <AlertDialog
          showAlert={showError.alert}
          title={alertTitle}
          message={errorMessage.alert}
          onClose={handleAlertClose}
        />
      </Grid>
    </ScreenGrid>
  );
}

export default EmailResetPasswordPage;
