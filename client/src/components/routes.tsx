import React from 'react';
import { Navigate, Route } from 'react-router-dom';

function UnauthenticatedRoute({ children }: { children: any }) {
  const isAuthenticated = false; // dummy value right now
  return isAuthenticated ? <Navigate to="/" /> : children;
}

function PrivateRoute({ children }: { children: any }) {
  const isAuthenticated = true; // dummy value right now
  return isAuthenticated ? children : <Navigate to="/" />;
}

export { UnauthenticatedRoute, PrivateRoute };
