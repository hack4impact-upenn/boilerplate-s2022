function LoginValidation(
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
  if (!password.match(passwordRegex) || !email.match(emailRegex)) {
    setError('fail');
    return 'fail';
  }
  setError('');
  return '';
}

function RegisterValidation(
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
    setError('invalidUsername');
    return 'invalidUsername';
  }
  if (!password.match(passwordRegex)) {
    setError('invalidPassword');
    return 'invalidPassword';
  }
  if (!(confirmPassword === password)) {
    setError('badMatch');
    return 'badMatch';
  }
  setError('');
  return '';
}

export { LoginValidation, RegisterValidation };
