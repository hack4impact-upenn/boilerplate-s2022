import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { RegisterValidation } from './inputValidation';
import ErrorMessage from './errorMessage';
import { MiniLinkText, FormHeaderText,  ScreenGrid, FormGridCol, FormGridRow, FormField, SubmitButton } from '../components/StyledComponents'


function RegisterPage() {
  const [email, setEmail] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function onSubmit() {
    const result = await RegisterValidation(
      email,
      password1,
      password2,
      setError,
    );
    if (result === '') {
      alert(email + password1);
      navigate('/');
    } else {
      alert('fail');
    }
  }

  return (
    <ScreenGrid>
      <FormGridCol>
        <FormField>
<FormHeaderText>
  We're so excited to have you on board!
  </FormHeaderText>
        </FormField>
        <FormGridRow>
        <FormField>
        <TextField
        error={error === 'empty'}
        helperText={<ErrorMessage error={error} />}
        id="login-text"
        type="text"
        required
        label="First Name"
        value={first}
        onChange={(e) => setFirst(e.target.value)}
      />
        </FormField>
        <FormField>
        <TextField
        error={error === 'empty'}
        helperText={<ErrorMessage error={error} />}
        id="login-text"
        type="text"
        required
        label="Last Name"
        value={last}
        onChange={(e) => setLast(e.target.value)}
      />
      </FormField>
        </FormGridRow>
        <FormField>
        <TextField
        error={
          error === 'empty' || error === 'badEmail' || error === 'duplicate'
        }
        helperText={<ErrorMessage error={error} />}
        id="login-text"
        type="email"
        required
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
        </FormField>
        <FormField>
        <TextField
        error={error === 'empty' || error === 'mismatch'}
        id="login-text"
        type="password"
        required
        label="Confirm Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
        </FormField>
          <FormField>
          <SubmitButton
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => onSubmit()}
      >
        Signup
      </SubmitButton>
      </FormField>
      <FormField>
      <MiniLinkText>
        Back to
        <Link component={RouterLink} to="/login">
          Login
        </Link>
      </MiniLinkText>
      </FormField>
      </FormGridCol>
    </ScreenGrid>
      
  
     
  );
}

export default RegisterPage;
