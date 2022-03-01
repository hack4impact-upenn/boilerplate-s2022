import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoute from './routing/PublicRoute';
import PrivateRoute from './routing/PrivateRoute';
import UnauthenticatedRoute from './routing/UnauthenticatedRoute';

// import pages here
import LoginPage from './pages/login/LoginView';
import RegisterPage from './pages/register/RegisterView';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <UnauthenticatedRoute>
              <LoginPage />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnauthenticatedRoute>
              <RegisterPage />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PublicRoute>
              <NotFoundPage />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
