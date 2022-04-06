import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getData, useData } from '../util/api';

const BACKENDURL = 'http://localhost:4000';

const isAuth = async () => {
  const res = await getData('/authstatus');
  if (res.error) return false;
  return true;
};

function UnauthenticatedRoute({ children }: { children: any }) {
  const data = useData(`${BACKENDURL}/api/auth/authstatus`);
  console.log('data in unauth is ', data);
  if (data === null) return null;
  return !data.error ? <Navigate to="/" /> : children;
}

function PrivateRoute({ children }: { children: any }) {
  const data = useData(`${BACKENDURL}/api/auth/authstatus`);
  console.log('data in unauth is ', data);
  if (data === null) return null;
  return !data.error ? children : <Navigate to="/" />;
}

export { UnauthenticatedRoute, PrivateRoute };
