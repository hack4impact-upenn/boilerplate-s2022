import React from 'react';
import './AdminSidebar.css';
import { useNavigate } from 'react-router-dom';
// import HomeIcon from '@mui/icons-material/Home';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="sidebar-container">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img
          src={require('../../assets/logo.png')}
          alt="Children's Environmental Literacy Foundation Logo"
          className="sidebar-logo-image"
        />
      </div>

      {/* Buttons Section */}
      <div className="sidebar-card">
        <button 
          className="sidebar-button"
          onClick={() => handleNavigation('/users')}
        >
          <span>Users</span>
        </button>
      </div>

      <div className="sidebar-card">
        <button 
          className="sidebar-button"
          onClick={() => handleNavigation('/speakers')}
        >
          <span>Speakers</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;
