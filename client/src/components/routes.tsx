import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useData } from '../util/api';
import { useAppDispatch } from '../util/redux/hooks';
import { logout } from '../util/redux/slice';
// const BACKENDURL = 'http://localhost:4000';

// const isAuth = async () => {
//   const res = await getData('auth/authstatus');
//   if (res.error) return false;
//   return true;
// };

function UnauthenticatedRoutesWrapper() {
  const data = useData('auth/authstatus');
  if (data === null) return null;
  return !data.error ? <Navigate to="/" /> : <Outlet />;
}

function ProtectedRoutesWrapper() {
  const data = useData('auth/authstatus');
  if (data === null) return null;
  return !data.error ? <Outlet /> : <Navigate to="/" />;
}

export { UnauthenticatedRoutesWrapper, ProtectedRoutesWrapper };
