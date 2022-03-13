import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Typography, Grid } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { ForgotValidation } from './inputValidation';
import ErrorMessage from './errorMessage';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function onSubmit() {
    const result = await ForgotValidation(email, setError);
    if (result === '') {
      alert(email);
      navigate('/');
    } else {
      alert('fail');
    }
  }
  async function onLogin() {
    navigate('/login');
  }

  return (
    <Grid>
      <Typography fontSize="h6.fontSize"> Forgot Password?</Typography>
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => onSubmit()}
      >
        Send Recovery Email
      </Button>
      <Typography>
        <Link component={RouterLink} to="/login">
          Login
        </Link>
      </Typography>
      <Typography>
        Need an account?
        <Link component={RouterLink} to="/register">
          Sign up
        </Link>
      </Typography>
    </Grid>
  );
}

export default ForgotPasswordPage;
