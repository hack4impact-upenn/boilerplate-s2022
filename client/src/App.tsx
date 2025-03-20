import React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import theme from './assets/theme.ts';
import { store, persistor } from './util/redux/store.ts';
import NotFoundPage from './NotFound/NotFoundPage.tsx';
import HomePage from './Home/HomePage.tsx';
import TeacherSearchSpeakerPage from './TeacherPage/TeacherSearchSpeakerPage.tsx';
import TeacherRequestSpeakerPage from './TeacherPage/TeacherRequestSpeakerPage.tsx';
import AdminDashboardPage from './AdminDashboard/AdminDashboardPage.tsx';
import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
  AdminRoutesWrapper,
} from './util/routes.tsx';
import VerifyAccountPage from './Authentication/VerifyAccountPage.tsx';
import RegisterPage from './Authentication/RegisterPage.tsx';
import Sidebar from './components/sidebar/Sidebar.tsx';
import LoginPage from './Authentication/LoginPage.tsx';
import EmailResetPasswordPage from './Authentication/EmailResetPasswordPage.tsx';
import ResetPasswordPage from './Authentication/ResetPasswordPage.tsx';
import AlertPopup from './components/AlertPopup.tsx';
import InviteRegisterPage from './Authentication/InviteRegisterPage.tsx';
import TopBar from './components/top_bar/TopBar.tsx';
import CardTest from './CardTest/CardTest.tsx';

import SearchBar from './components/search_bar/SearchBar.tsx';

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
              <Routes>
                {/* <Route path="/home" element={<HomePage />} /> */}
                {/* Routes accessed only if user is not authenticated */}
                <Route element={<UnauthenticatedRoutesWrapper />}>
                  {/* TODO: REMOVE TEST ROUTE */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
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
                {/* Remove or import SearchSpeaker component */}
                {/* <Route path="/search" element={<SearchSpeakerPage />} /> */}
                {/* Routes accessed only if user is authenticated */}
                <Route element={<ProtectedRoutesWrapper />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/teacher-search-speaker" element={<TeacherSearchSpeakerPage />} />
                  <Route path="/teacher-speaker-requests" element={<TeacherRequestSpeakerPage />} 
                  />
                </Route>
                <Route element={<AdminRoutesWrapper />}>
                  <Route path="/users" element={<AdminDashboardPage />} />
                </Route>

                <Route
                  path="/"
                  element={
                    <DynamicRedirect unAuthPath="/login" authPath="/home" />
                  }
                />

                <Route path="*" element={<NotFoundPage />} />
                <Route path="/cardtest" element={<CardTest requests={[]} />} />
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
