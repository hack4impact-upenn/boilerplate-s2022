import React, { useState } from 'react';
import { makeStyles, Theme } from '@mui/material';

export function useForm(
  initialFValues: any,
  validate: any,
  validateOnChange = false,
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e: React.FormEvent) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props: any) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}

/**
import { useState, useEffect, ReactElement } from 'react';
import TextField from '@mui/material/TextField';



function inputValidation(): ReactElement {
  const [password, setPassword] = useState({
    firstPassword: '',
    secondPassword: ''
  })
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(8)
  const [isError, setError] = useState(false);

  const inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const { value, name } = e.target;
    setPassword({
      ...password,
      [name]: value
    })
  }

  useEffect(() => {
    setValidLength(password.firstPassword.length >= requiredLength ? true : false);
    setUpperCase(password.firstPassword.toLowerCase() !== password.firstPassword);
    setLowerCase(password.firstPassword.toUpperCase() !== password.firstPassword);
    setHasNumber(/\d/.test(password.firstPassword));
    setMatch(!!password.firstPassword && password.firstPassword === password.secondPassword)
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password.firstPassword));

  }, [password, requiredLength]);

  return (
    <div >
      <TextField 
          id="register-text" 
          type="password" 
          required 
          label="firstPassword" 
          value={password} 
          onChange={e => setPassword(e.target.firstPassword)}
            />
            <TextField 
                id="register-text" 
                type="password" 
                required 
                label="secondPassword" 
                value={password} 
                onChange={e => setPassword(e.target.name)}
              />
            <ul>
              <li>
                Valid Length: {validLength ? <span>True</span> : <span>False</span>}
              </li>
              <li>
                Has a Number: {hasNumber ? <span>True</span> : <span>False</span>}
              </li>
              <li>
                UpperCase: {upperCase ? <span>True</span> : <span>False</span>}
              </li>
              <li>
                LowerCase: {lowerCase ? <span>True</span> : <span>False</span>}
              </li>
              <li>Match: {match ? <span>True</span> : <span>False</span>}</li>
              <li>
                Special Character: {specialChar ? <span>True</span> : <span>False</span>}
              </li>
            </ul>
          </div>
        );
      }
      
      export default inputValidation;
 */
