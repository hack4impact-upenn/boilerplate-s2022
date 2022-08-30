import { login, register } from './api';

// Descriptive error messages for various input validation errors
enum ErrorMessage {
  INVALID_PASSWORD = 'Password must have 6-61 characters',
  INVALID_EMAIL = 'Invalid email addresss',
  PASSWORD_MISMATCH = 'Passwords do not match',
  MISSING = 'Missing entry',
}

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/g;

async function LoginValidation(
  email: string,
  password: string,
  setError: (e: string) => void,
  dispatchUser: (
    userEmail: string,
    firstName: string,
    lastName: string,
    admin: boolean,
  ) => void,
) {
  if (!password || !email) {
    setError('empty');
    return 'empty';
  }
  const user = await login(email, password);
  if (!password.match(passwordRegex) || !email.match(emailRegex) || !user) {
    setError('fail');
    return 'fail';
  }
  setError('');
  dispatchUser(user.email, user.firstName, user.lastName, user.admin);
  return '';
}

async function RegisterValidation(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  setError: (a: string) => void,
) {
  const nameRegex = /^[a-z ,.'-]+/i;
  if (!password || !email || !confirmPassword || !firstName || !lastName) {
    setError('empty');
    return 'empty';
  }
  if (!email.match(emailRegex)) {
    setError('badEmail');
    return 'badEmail';
  }
  if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
    setError('badName');
    return 'badName';
  }
  if (!password.match(passwordRegex)) {
    setError('badPassword');
    return 'badPassword';
  }
  if (!(confirmPassword === password)) {
    setError('mismatch');
    return 'mismatch';
  }
  if (!(await register(firstName, lastName, email, password))) {
    setError('duplicate');
    return 'duplicate';
  }

  setError('');
  return '';
}

/**
 * Validates the inputs for resetting a password and sets the appropriate
 * error messages if needed
 * @param password The inputted password
 * @param confirmPassword The inputted password to confirm the original password
 * @param setPasswordError A hook for setting the existence of an error with `password`
 * @param setConfirmPasswordError A hook for setting the existence of an error with `confirmPassword`
 * @param setPasswordErrorMessage A hook for setting the error message for `password`
 * @param setConfirmPasswordErrorMessage A hook for setting the error message for `confirmassword`
 * @returns The success of the validation check
 */
function resetPasswordInputsAreValid(
  password: string,
  confirmPassword: string,
  setPasswordError: (exists: boolean) => void,
  setConfirmPasswordError: (exists: boolean) => void,
  setPasswordErrorMessage: (msg: string) => void,
  setConfirmPasswordErrorMessage: (msg: string) => void,
): boolean {
  setPasswordError(false);
  setConfirmPasswordError(false);
  setPasswordErrorMessage('');
  setConfirmPasswordErrorMessage('');

  if (!password) {
    setPasswordError(true);
    setPasswordErrorMessage(ErrorMessage.MISSING);
    return false;
  }
  if (!confirmPassword) {
    setConfirmPasswordError(true);
    setConfirmPasswordErrorMessage(ErrorMessage.MISSING);
    return false;
  }
  if (!password.match(passwordRegex)) {
    setPasswordError(true);
    setPasswordErrorMessage(ErrorMessage.INVALID_PASSWORD);
    return false;
  }
  if (!(confirmPassword === password)) {
    setConfirmPasswordError(true);
    setConfirmPasswordErrorMessage(ErrorMessage.PASSWORD_MISMATCH);
    return false;
  }
  return true;
}

/**
 * Validates an email input and sets the appropriate error messages if needed
 * @param email The inputted email
 * @param setEmailError A hook for setting the existence of an error with `email`
 * @param setEmailErrorMessage A hook for setting the error message for `email`
 * @returns The success of the validataion check
 */
function emailInputIsValid(
  email: string,
  setEmailError: (exists: boolean) => void,
  setEmailErrorMessage: (msg: string) => void,
): boolean {
  setEmailError(false);
  setEmailErrorMessage('');
  if (!email.match(emailRegex)) {
    setEmailError(true);
    setEmailErrorMessage(ErrorMessage.INVALID_EMAIL);
    return false;
  }
  return true;
}

export {
  LoginValidation,
  RegisterValidation,
  resetPasswordInputsAreValid,
  emailInputIsValid,
};
