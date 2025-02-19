import React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import theme from './assets/theme.ts';
import { store, persistor } from './util/redux/store.ts';
import NotFoundPage from './NotFound/NotFoundPage.tsx';
import HomePage from './Home/HomePage.tsx';
import AdminDashboardPage from './AdminDashboard/AdminDashboardPage.tsx';
import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
  AdminRoutesWrapper,
} from './util/routes.tsx';
import VerifyAccountPage from './Authentication/VerifyAccountPage.tsx';
import RegisterPage from './Authentication/RegisterPage.tsx';
import Sidebar from './sidebar/Sidebar.tsx';
import LoginPage from './Authentication/LoginPage.tsx';
import EmailResetPasswordPage from './Authentication/EmailResetPasswordPage.tsx';
import ResetPasswordPage from './Authentication/ResetPasswordPage.tsx';
import AlertPopup from './components/AlertPopup.tsx';
import InviteRegisterPage from './Authentication/InviteRegisterPage.tsx';
import TopBar from './components/TopBar.tsx';
import CardTest from './CardTest/CardTest.tsx';
// import SearchBar from './components/search_bar/SearchBar.tsx';
import SearchSpeaker from './SearchSpeaker.tsx';

function App() {
  return (
    <div className="App">
      {/* <SearchBar onSearch={handleSearch} placeholder="Type your search..." /> */}
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* <ThemeProvider theme={theme}> */}
            <CssBaseline>
              <AlertPopup />
              <TopBar />
              <Routes>
                <Route path="/test-sidebar" element={<Sidebar />} />
                {/* Routes accessed only if user is not authenticated */}
                <Route element={<UnauthenticatedRoutesWrapper />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/search-speakers" element={<SearchSpeaker />} />
                  <Route
                    path="/verify-account/:token"
                    element={<VerifyAccountPage />}
                  />
                  <Route
                    path="/email-reset"
                    element={<EmailResetPasswordPage />}
                  />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPasswordPage />}
                  />
                </Route>
                <Route path="/invite/:token" element={<InviteRegisterPage />} />
                <Route path="/search" element={<SearchSpeaker />} />
                {/* Routes accessed only if user is authenticated */}
                <Route element={<ProtectedRoutesWrapper />}>
                  <Route path="/home" element={<HomePage />} />
                </Route>
                <Route element={<AdminRoutesWrapper />}>
                  <Route path="/users" element={<AdminDashboardPage />} />
                </Route>

                {/* Route which redirects to a different page depending on if the user is an authenticated or not by utilizing the DynamicRedirect component */}
                <Route
                  path="/"
                  element={
                    <DynamicRedirect unAuthPath="/login" authPath="/home" />
                  }
                />

                {/* Route which is accessed if no other route is matched */}
                <Route path="*" element={<NotFoundPage />} />
                {/* TODO: delete */}
                <Route path="/cardtest" element={<CardTest />} />
              </Routes>
            </CssBaseline>
            {/* </ThemeProvider> */}
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
