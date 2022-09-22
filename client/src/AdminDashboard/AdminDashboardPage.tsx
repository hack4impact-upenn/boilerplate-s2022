import React from 'react';
import { Typography, Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import UserTable from './userTable';

function AdminDashboardPage() {
  return (
    <ScreenGrid>
      <Grid
        item
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Typography variant="h2">Welcome to the Admin Dashboard</Typography>

        <div style={{ height: '60vh', width: '60vw' }}>
          <UserTable />
        </div>
      </Grid>
    </ScreenGrid>
  );
}

export default AdminDashboardPage;
