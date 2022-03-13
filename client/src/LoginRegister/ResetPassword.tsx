import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { ResetValidation } from './inputValidation';
import ErrorMessage from './errorMessage';

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
    <FormControl>
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
      <TextField
        error={error === 'empty' || error === 'badPassword'}
        id="login-text"
        type="password"
        required
        label="Password"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      />
      <TextField
        error={error === 'empty' || error === 'mismatch'}
        id="login-text"
        type="password"
        required
        label="Confirm Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => onSubmit()}
      >
        Reset Password
      </Button>
      <Typography>
        Back to
        <Link component={RouterLink} to="/login">
          Login
        </Link>
      </Typography>
    </FormControl>
  );
}

export default ResetPage;
