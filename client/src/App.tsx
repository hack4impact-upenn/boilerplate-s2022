/* eslint-disable no-lone-blocks */
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './assets/theme';

import LoginView from './LoginRegister/LoginPage';
import RegisterPage from './LoginRegister/RegisterPage';
import ForgotPasswordPage from './LoginRegister/ForgotPasswordPage';
import ResetPasswordPage from './LoginRegister/ResetPasswordPage';
import NotFoundPage from './NotFound/NotFoundPage';
import HomeView from './Home/HomeView';
import AdminDashboard from './AdminDashboard/AdminDashboard';

import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
} from './components/routes';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<UnauthenticatedRoutesWrapper />}>
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot" element={<ForgotPasswordPage />} />
              <Route path="/reset" element={<ResetPasswordPage />} />
            </Route>
            <Route element={<ProtectedRoutesWrapper />}>
              <Route path="/home" element={<HomeView />} />
              <Route path="/users" element={<AdminDashboard />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
