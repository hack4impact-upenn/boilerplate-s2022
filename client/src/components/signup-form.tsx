
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import theme from '../assets/theme';
import Button from '@mui/material/Button';



const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(firstName + lastName + email + password);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl>
        <TextField id="register-text" type="text" required label="First Name" />
        <TextField id="register-text" type="text" label="Last Name" />
        <TextField id="register-text" type="email" label="Email" />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Signup
          </Button>
        </div>
        </FormControl>
    </ThemeProvider>
  )
}

export default SignUpForm;
