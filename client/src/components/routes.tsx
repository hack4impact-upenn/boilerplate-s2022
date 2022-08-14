import React from 'react';
import { Outlet, Navigate, Route } from 'react-router-dom';
import { useData } from '../util/api';

// const BACKENDURL = 'http://localhost:4000';

// const isAuth = async () => {
//   const res = await getData('auth/authstatus');
//   if (res.error) return false;
//   return true;
// };

interface IDynamicElementProps {
  unAuthPath: string;
  authPath: string;
}

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

function AdminRoutesWrapper() {
  const data = useData('user/adminstatus');
  if (data === null) return null;
  return !data.error ? <Outlet /> : <Navigate to="/" />;
}

function DynamicRedirect({ unAuthPath, authPath }: IDynamicElementProps) {
  const data = useData('auth/authstatus');
  if (data === null) return null;
  return !data.error ? (
    <Navigate to={authPath} />
  ) : (
    <Navigate to={unAuthPath} />
  );
}

export {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  AdminRoutesWrapper,
  DynamicRedirect,
};
