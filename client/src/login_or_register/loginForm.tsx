import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import theme from '../assets/theme';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <FormControl>
        <TextField
          id="login-text"
          type="email"
          required
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="login-text"
          type="password"
          required
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </div>
      </FormControl>
    </ThemeProvider>
  );
}

export default LoginForm;
