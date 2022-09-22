import { deleteData, putData } from '../util/api';

async function deleteUser(email: string) {
  const res = await deleteData(`user/${email}`);
  console.log('delete res is', res);
  if (res.error) return false;
  return true;
}

async function upgradePrivilege(email: string) {
  const res = await putData('user/promote', { email });
  console.log('upgrade res is', res);
  if (res.error) return false;
  return true;
}

export { deleteUser, upgradePrivilege };
