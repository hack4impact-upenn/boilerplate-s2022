import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './assets/theme';
import LoginView from './LoginRegister/LoginPage';
import RegisterPage from './LoginRegister/RegisterPage';
import ForgotPasswordPage from './LoginRegister/ForgotPasswordPage';
import ResetPasswordPage from './LoginRegister/ResetPasswordPage';
import NotFoundPage from './NotFound/NotFoundPage';
import { UnauthenticatedRoute, PrivateRoute } from './components/routes';
import HomeView from './home/HomeView';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <UnauthenticatedRoute>
                  <LoginView />
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
              path="/forgot"
              element={
                <UnauthenticatedRoute>
                  <ForgotPasswordPage />
                </UnauthenticatedRoute>
              }
            />
            <Route
              path="/reset"
              element={
                <UnauthenticatedRoute>
                  <ResetPasswordPage />
                </UnauthenticatedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomeView />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
