import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Input from './controls/input';
import Button from './controls/button';
import { useForm, Form } from './controls/submitForm';

const initialFValues = {
  fullName: '',
  email: '',
  password: '',
  conPassword: '',
};

export default function EmployeeForm() {
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName ? '' : 'This field is required.';
    if ('email' in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ''
        : 'Email is not valid.';
    if (('password', 'conPassword' in fieldValues))
      temp.password =
        fieldValues.password === fieldValues.conPassword
          ? ''
          : 'Passwords do not Match';
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Input
            label="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            name="conPassword"
            value={values.conPassword}
            onChange={handleInputChange}
            error={errors.conPassword}
          />
        </Grid>

        <div>
          <Button type="submit" text="Submit" />
          <Button text="Reset" color="default" onClick={resetForm} />
        </div>
      </Grid>
    </Form>
  );
}

/** import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import theme from '../assets/theme';
import Button from '@mui/material/Button';
import inputValidation from './input-validation';



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
        <TextField 
          id="register-text" 
          type="text" 
          required 
          label="First Name" 
          value={firstName} 
          onChange={e => setFirstName(e.target.value)}
        />
        <TextField 
          id="register-text" 
          type="text" 
          required 
          label="Last Name" 
          value={lastName} 
          onChange={e => setLastName(e.target.value)}
        />
        <TextField 
          id="register-text" 
          type="email" 
          required 
          label="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Signup
          </Button>
        </div>
        </FormControl>
    </ThemeProvider>
  )
}

export default SignUpForm;* */
