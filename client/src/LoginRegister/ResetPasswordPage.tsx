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
import AlertDialog from '../components/alertDialog';

/**
 * A page that allows users to reset their password by inputting a new password
 * into a form.
 */
function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [passwordErrorExists, setPasswordErrorExists] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordErrorExists, setConfirmPasswordErrorExists] =
    useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const alertTitle = 'Error';

  const { token } = useParams();
  const navigate = useNavigate();

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  async function makeResetCall() {
    if (
      resetPasswordInputsAreValid(
        password,
        confirmPassword,
        setPasswordErrorExists,
        setConfirmPasswordErrorExists,
        setPasswordErrorMessage,
        setConfirmPasswordErrorMessage,
      )
    ) {
      resetPassword(password, token || 'missing token')
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
          <FormHeaderText>Reset your Password.</FormHeaderText>
        </FormField>
        <FormField>
          <TextField
            error={passwordErrorExists}
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
            error={confirmPasswordErrorExists}
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

export default ResetPasswordPage;
