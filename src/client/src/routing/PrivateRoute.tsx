import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ path, element }: { path: string; element: any }) {
  const isAuthenticated = true; // dummy value right now
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
