import React, { useState } from 'react';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { LoginValidation } from './inputValidation';
import ErrorMessage from './errorMessage';

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function onSubmit() {
    const result = await LoginValidation(email, password, setError);
    if (result === '') {
      alert(email + password);
      navigate('/');
    } else {
      alert('fail');
    }
  }

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      direction="column"
      alignItems="center"
    >
      <Grid item xs="auto">
        <Typography fontSize="h6.fontSize">
          Welcome! Lets get started.
        </Typography>
      </Grid>
      <Grid item xs="auto">
        <TextField
          error={error === 'empty' || error === 'badEmail' || error === 'fail'}
          helperText={<ErrorMessage error={error} />}
          id="login-text"
          type="email"
          required
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs="auto">
        <TextField
          error={error === 'empty' || error === 'fail'}
          helperText={<ErrorMessage error={error} />}
          id="login-text"
          type="password"
          required
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-end"
        xs="auto"
        columnSpacing={4}
        rowSpacing={0}
      >
        <Grid item xs>
          <Typography fontSize={12} noWrap>
            <Link component={RouterLink} to="/forgot">
              Forgot password?
            </Link>
          </Typography>
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => onSubmit()}
          >
            Login
          </Button>
        </Grid>
      </Grid>
      <Grid item xs="auto">
        <Typography fontSize={12}>
          Need an account?{' '}
          <Link component={RouterLink} to="/register">
            Sign up
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default LoginView;
