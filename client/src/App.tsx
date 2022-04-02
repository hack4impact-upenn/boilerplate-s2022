import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './assets/theme';
import LoginView from './LoginRegister/LoginPage';
import RegisterPage from './LoginRegister/RegisterPage';
import ForgotPasswordPage from './LoginRegister/ForgotPasswordPage';
import ResetPasswordPage from './LoginRegister/ResetPasswordPage';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
            <Route path="/reset" element={<ResetPasswordPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
