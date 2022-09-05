import React from 'react';
import { Grid } from '@mui/material';
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
        <UserTable />
      </Grid>
    </ScreenGrid>
  );
}

export default AdminDashboardPage;
