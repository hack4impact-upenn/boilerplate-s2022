import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoute from './routing/PublicRoute';
import PrivateRoute from './routing/PrivateRoute';

// import pages here
import AppContainer from './AppContainer';
import LoginPage from './pages/login/LoginView';
import RegisterPage from './pages/register/RegisterView';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <PublicRoute path="/" element={<LoginPage />} />
          <PublicRoute path="/register" element={<RegisterPage />} />
          <PrivateRoute path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={NotFoundPage} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
