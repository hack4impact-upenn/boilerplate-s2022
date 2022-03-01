async function login(email: string, password: string) {
  alert('validate login info and login if valid');
  return true;
}

async function register(email: string) {
  alert(
    'check if email is registered already, if it is return false else register',
  );
  return true;
}

export { register, login };
