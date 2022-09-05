import { register } from './api';

// Descriptive error messages for various input validation errors
enum ErrorMessage {
  INVALID_PASSWORD = 'Password must have 6-61 characters',
  INVALID_EMAIL = 'Invalid email addresss',
  PASSWORD_MISMATCH = 'Passwords do not match',
  MISSING_INPUT = 'Missing input',
}

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/g;
const nameRegex = /^[a-z ,.'-]+/i;

async function RegisterValidation(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  setError: (a: string) => void,
) {
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
 * @param setPasswordErrorExists A hook for setting the existence of an error with `password`
 * @param setConfirmPasswordErrorExists A hook for setting the existence of an error with `confirmPassword`
 * @param setPasswordErrorMessage A hook for setting the error message for `password`
 * @param setConfirmPasswordErrorMessage A hook for setting the error message for `confirmassword`
 * @returns The success of the validation check
 */
function resetPasswordInputsAreValid(
  password: string,
  confirmPassword: string,
  setPasswordErrorExists: (exists: boolean) => void,
  setConfirmPasswordErrorExists: (exists: boolean) => void,
  setPasswordErrorMessage: (msg: string) => void,
  setConfirmPasswordErrorMessage: (msg: string) => void,
): boolean {
  setPasswordErrorExists(false);
  setConfirmPasswordErrorExists(false);
  setPasswordErrorMessage('');
  setConfirmPasswordErrorMessage('');

  if (!password) {
    setPasswordErrorExists(true);
    setPasswordErrorMessage(ErrorMessage.MISSING_INPUT);
    return false;
  }
  if (!confirmPassword) {
    setConfirmPasswordErrorExists(true);
    setConfirmPasswordErrorMessage(ErrorMessage.MISSING_INPUT);
    return false;
  }
  if (!password.match(passwordRegex)) {
    setPasswordErrorExists(true);
    setPasswordErrorMessage(ErrorMessage.INVALID_PASSWORD);
    return false;
  }
  if (!(confirmPassword === password)) {
    setConfirmPasswordErrorExists(true);
    setConfirmPasswordErrorMessage(ErrorMessage.PASSWORD_MISMATCH);
    return false;
  }
  return true;
}

/**
 * Validates an email input and sets the appropriate error messages if needed
 * @param email The inputted email
 * @param setEmailErrorExists A hook for setting the existence of an error with `email`
 * @param setEmailErrorMessage A hook for setting the error message for `email`
 * @returns The success of the validataion check
 */
function emailInputIsValid(
  email: string,
  setEmailErrorExists: (exists: boolean) => void,
  setEmailErrorMessage: (msg: string) => void,
): boolean {
  setEmailErrorExists(false);
  setEmailErrorMessage('');
  if (!email.match(emailRegex)) {
    setEmailErrorExists(true);
    setEmailErrorMessage(ErrorMessage.INVALID_EMAIL);
    return false;
  }
  return true;
}

export { RegisterValidation, resetPasswordInputsAreValid, emailInputIsValid };
