import { deleteData, putData } from '../util/api';

async function deleteUser(email: string) {
  const res = await deleteData(`user/${email}`);
  console.log('login res is', res);
  if (res.error) return false;
  return true;
}

async function upgradePrivilege(email: string) {
  const res = await putData('user/upgrade-privilege', { email });
  console.log('register res is', res);
  if (res.error) return false;
  return true;
}

export { deleteUser, upgradePrivilege };
