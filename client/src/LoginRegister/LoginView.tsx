import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
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
      navigate('/main');
    }
  }

  return (
    <>
      {/* <ErrorMessage error={error} />
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onSubmit={() => onSubmit()}
          >
            Login
          </Button>
        </div>
      </FormControl> */}
      <div>h</div>
    </>
  );
}

export default LoginView;
