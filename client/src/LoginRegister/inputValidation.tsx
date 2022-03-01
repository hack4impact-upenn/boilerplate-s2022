import { login, register } from './api';

async function LoginValidation(
  email: string,
  password: string,
  setError: (a: string) => void,
) {
  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/g;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
  if (!password || !email) {
    setError('empty');
    return 'empty';
  }
  if (
    !password.match(passwordRegex) ||
    !email.match(emailRegex) ||
    !(await login(email, password))
  ) {
    setError('fail');
    return 'fail';
  }
  setError('');
  return '';
}

async function RegisterValidation(
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
  if (!(await register(email))) {
    setError('duplicate');
    return 'duplicate';
  }

  setError('');
  return '';
}

export { LoginValidation, RegisterValidation };
