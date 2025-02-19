import React from 'react';
import './Sidebar.css';
// import HomeIcon from '@mui/icons-material/Home';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img
          src={require('../assets/logo.png')}
          alt="Children's Environmental Literacy Foundation Logo"
          className="sidebar-logo-image"
        />
      </div>
      {/* Buttons Section */}
      <div className="sidebar-card">
        <button className="sidebar-button">
          <span>Home</span>
        </button>
      </div>

      <div className="sidebar-card">
        <button className="sidebar-button">Profile</button>
      </div>

      <div className="sidebar-card">
        <button className="sidebar-button">Settings</button>
      </div>
    </div>
  );
};

export default Sidebar;
