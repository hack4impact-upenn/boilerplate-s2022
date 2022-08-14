import { login, register, forgotPassword, resetPassword } from './api';

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
  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/g;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
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
  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/g;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
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

async function ForgotValidation(email: string, setError: (a: string) => void) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
  if (!email) {
    setError('empty');
    return 'empty';
  }
  if (!email.match(emailRegex)) {
    setError('badEmail');
    return 'badEmail';
  }
  if (!(await forgotPassword(email))) {
    setError('accountDNE');
    return 'accountDNE';
  }

  setError('');
  return '';
}

async function ResetValidation(
  email: string,
  password: string,
  confirmPassword: string,
  setError: (a: string) => void,
) {
  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/g;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
  if (!password || !email || !confirmPassword) {
    setError('empty');
    return 'empty';
  }
  if (!email.match(emailRegex)) {
    setError('badEmail');
    return 'badEmail';
  }
  if (!password.match(passwordRegex)) {
    setError('badPassword');
    return 'badPassword';
  }
  if (!(confirmPassword === password)) {
    setError('mismatch');
    return 'mismatch';
  }
  if (!(await resetPassword(email))) {
    setError('accountDNE');
    return 'accountDNE';
  }

  setError('');
  return '';
}

export {
  LoginValidation,
  RegisterValidation,
  ForgotValidation,
  ResetValidation,
};
