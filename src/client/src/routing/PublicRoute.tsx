import React from 'react';
import { Navigate, Route } from 'react-router-dom';

function PublicRoute({ path, element }: { path: string; element: any }) {
  const isAuthenticated = true; // dummy value right now

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Route path={path} element={element} />
  );
}

export default PublicRoute;
