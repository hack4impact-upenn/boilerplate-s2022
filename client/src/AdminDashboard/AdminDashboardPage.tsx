import React from 'react';
import { styled } from '@mui/system';
import SearchBar from '../components/search_bar/SearchBar.tsx';
import SpeakerCard from '../components/cards/SpeakerCard.tsx';
import AdminSidebar from '../components/admin_sidebar/AdminSidebar.tsx';
import TopBar from '../components/top_bar/TopBar.tsx';
import './AdminDashboard.css';
import { Typography, Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid.tsx';
import UserTable from './UserTable.tsx';
import InviteUserButton from '../components/buttons/InviteUserButton.tsx';


function AdminDashboardPage() {
  return (
    <div className="flex-div">
      <TopBar />
      <AdminSidebar />

      <div className="main-window">
        {/* The parent Grid has a custom class for width & centering */}
        <Grid container direction="column" spacing={4} className="admin-grid">
          <Grid item>
            <Typography variant="h2" align="center">
              Welcome to the Admin Dashboard
            </Typography>
          </Grid>

          {/* "invite-button-grid" class to align the button on the right */}
          <Grid item container className="invite-button-grid">
            <InviteUserButton />
          </Grid>

          <Grid item>
            {/* "table-container" class for sizing & optional centering */}
            <div className="table-container">
              <UserTable />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AdminDashboardPage;