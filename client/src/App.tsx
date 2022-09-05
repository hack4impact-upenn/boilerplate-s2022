/* eslint-disable no-lone-blocks */
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import theme from './assets/theme';
import { store, persistor } from './util/redux/store';

import NotFoundPage from './notFound/NotFoundPage';
import HomeView from './home/HomeView';
import AdminDashboard from './adminDashboard/AdminDashboard';

import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
  AdminRoutesWrapper,
} from './util/routes';
import VerifyAccountPage from './Authentication/VerifyAccountPage';
import RegisterPage from './Authentication/RegisterPage';
import LoginPage from './Authentication/LoginPage';
import ResetPasswordEmailPage from './Authentication/SendResetPasswordEmailPage';
import ResetPasswordPage from './Authentication/ResetPasswordPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline>
                <Routes>
                  {/* Routes accessed only if user is not authenticated */}
                  <Route element={<UnauthenticatedRoutesWrapper />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/verify-account/:token"
                      element={<VerifyAccountPage />}
                    />
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
              </CssBaseline>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
