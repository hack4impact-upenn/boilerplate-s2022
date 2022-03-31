/* eslint-disable @typescript-eslint/no-unused-vars */

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

async function forgotPassword(email: string) {
  alert('if email is registered, send email to reset password');
  return true;
}

async function resetPassword(email: string) {
  alert(
    'if email is registered, change password from old password to new password',
  );
  return true;
}

export { register, login, forgotPassword, resetPassword };
