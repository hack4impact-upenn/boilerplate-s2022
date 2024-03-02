import React, { useState } from 'react';
import { TextField, Link, Typography, Grid } from '@mui/material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { resetPassword } from './api.ts';
import FormGrid from '../components/form/FormGrid.tsx';
import { InputErrorMessage, passwordRegex } from '../util/inputvalidation.ts';
import AlertDialog from '../components/AlertDialog.tsx';
import PrimaryButton from '../components/buttons/PrimaryButton.tsx';
import ScreenGrid from '../components/ScreenGrid.tsx';
import FormCol from '../components/form/FormCol.tsx';

/**
 * A page that allows users to reset their password by inputting a new password
 * into a form.
 */
function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  // Default values for state
  const defaultValues = {
    password: '',
    confirmPassword: '',
  };
  const defaultShowErrors = {
    password: false,
    confirmPassword: false,
    alert: false,
  };
  const defaultErrorMessages = {
    password: '',
    confirmPassword: '',
    alert: '',
  };
  type ValueType = keyof typeof values;

  // State values and hooks
  const [values, setValueState] = useState(defaultValues);
  const [showError, setShowErrorState] = useState(defaultShowErrors);
  const [errorMessage, setErrorMessageState] = useState(defaultErrorMessages);

  // Helper functions for changing only one field in a state object
  const setValue = (field: string, value: string) => {
    setValueState((prevState) => ({
      ...prevState,
      ...{ [field]: value },
    }));
  };
  const setShowError = (field: string, show: boolean) => {
    setShowErrorState((prevState) => ({
      ...prevState,
      ...{ [field]: show },
    }));
  };
  const setErrorMessage = (field: string, msg: string) => {
    setErrorMessageState((prevState) => ({
      ...prevState,
      ...{ [field]: msg },
    }));
  };

  const clearErrorMessages = () => {
    setShowErrorState(defaultShowErrors);
    setErrorMessageState(defaultErrorMessages);
  };

  const validateInputs = () => {
    clearErrorMessages();
    let isValid = true;

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const valueTypeString in values) {
      const valueType = valueTypeString as ValueType;
      if (!values[valueType]) {
        setErrorMessage(valueTypeString, InputErrorMessage.MISSING_INPUT);
        setShowError(valueTypeString, true);
        isValid = false;
      }
    }

    if (!values.password.match(passwordRegex)) {
      setErrorMessage('password', InputErrorMessage.INVALID_PASSWORD);
      setShowError('password', true);
      isValid = false;
    }
    if (!(values.password === values.confirmPassword)) {
      setErrorMessage('confirmPassword', InputErrorMessage.PASSWORD_MISMATCH);
      setShowError('confirmPassword', true);
      isValid = false;
    }
    return isValid;
  };

  const alertTitle = 'Error';
  const handleAlertClose = () => {
    setShowError('alert', false);
  };

  async function handleSubmit() {
    if (validateInputs()) {
      resetPassword(values.password, token || 'missing token')
        .then(() => {
          navigate('/');
        })
        .catch((e) => {
          setErrorMessage('alert', e.message);
          setShowError('alert', true);
        });
    }
  }

  return (
    <ScreenGrid>
      <FormGrid>
        <FormCol>
          <Grid item container justifyContent="center">
            <Typography variant="h2">Excited to have you back!</Typography>
          </Grid>
          <Grid item width="1">
            <TextField
              fullWidth
              error={showError.password}
              helperText={errorMessage.password}
              type="password"
              required
              label="New Password"
              value={values.password}
              onChange={(e) => setValue('password', e.target.value)}
            />
          </Grid>
          <Grid item width="1">
            <TextField
              fullWidth
              error={showError.confirmPassword}
              helperText={errorMessage.confirmPassword}
              type="password"
              required
              label="Confirm Password"
              value={values.confirmPassword}
              onChange={(e) => setValue('confirmPassword', e.target.value)}
            />
          </Grid>
          <Grid item width="1">
            <PrimaryButton
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Reset Password
            </PrimaryButton>
          </Grid>
          <Grid item container justifyContent="center">
            <Link component={RouterLink} to="/login">
              Back to Login
            </Link>
          </Grid>
        </FormCol>
      </FormGrid>
      {/* The alert that pops up */}
      <AlertDialog
        showAlert={showError.alert}
        title={alertTitle}
        message={errorMessage.alert}
        onClose={handleAlertClose}
      />
    </ScreenGrid>
  );
}

export default ResetPasswordPage;
