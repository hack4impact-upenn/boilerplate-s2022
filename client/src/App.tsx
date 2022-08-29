/* eslint-disable no-lone-blocks */
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import theme from './assets/theme';
import { store, persistor } from './util/redux/store';

import LoginView from './LoginRegister/LoginPage';
import RegisterPage from './LoginRegister/RegisterPage';
import ResetPasswordPage from './LoginRegister/ResetPasswordPage';
import NotFoundPage from './NotFound/NotFoundPage';
import HomeView from './home/HomeView';
import AdminDashboard from './AdminDashboard/AdminDashboard';

import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
  AdminRoutesWrapper,
} from './components/routes';
import ResetPasswordEmailPage from './LoginRegister/SendResetPasswordEmailPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <Routes>
                {/* Routes accessed only if user is not authenticated */}
                <Route element={<UnauthenticatedRoutesWrapper />}>
                  <Route path="/login" element={<LoginView />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/email-reset"
                    element={<ResetPasswordEmailPage />}
                  />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPasswordPage />}
                  />
                </Route>
                {/* Routes accessed only if user is authenticated */}
                <Route element={<ProtectedRoutesWrapper />}>
                  <Route path="/home" element={<HomeView />} />
                </Route>
                <Route element={<AdminRoutesWrapper />}>
                  <Route path="/users" element={<AdminDashboard />} />
                </Route>
                {/* Element depends on of if users is authorized or unauthorized */}
                <Route
                  path="/"
                  element={
                    <DynamicRedirect unAuthPath="/login" authPath="/home" />
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
