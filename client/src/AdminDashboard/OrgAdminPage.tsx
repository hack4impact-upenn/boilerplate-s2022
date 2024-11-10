import React from 'react';
import { Typography, Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid.tsx';
import OrgTable from './OrgTable.tsx';
import InviteUserButton from '../components/buttons/InviteUserButton.tsx';

/**
 * A page only accessible to admins that displays all users in a table and allows
 * Admin to delete users from admin and promote users to admin.
 */
function OrgAdminPage() {
  return (
    <ScreenGrid>
      <Grid item>
        <Typography variant="h2">Welcome to the Admin Dashboard</Typography>
      </Grid>
      <Grid item>
        <div style={{ height: '60vh', width: '60vw' }}>
          <OrgTable />
        </div>
      </Grid>
    </ScreenGrid>
  );
}

export default OrgAdminPage;
