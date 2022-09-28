import React from 'react';
import {
  Typography,
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
} from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import UserTable from '../AdminDashboard/UserTable';
import ToxicPeopleTable from './ToxicPeopleTable';

/**
 * A page only accessible to admins that displays all users in a table and allows Admin to delete users from admin and promote users to admin.
 */
function ToxicPeopleGroupPage() {
  return (
    <ScreenGrid>
      <Grid
        item
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Typography variant="h2">The most toxic people in Hack</Typography>

        <div style={{ height: '60vh', width: '60vw' }}>
          <ToxicPeopleTable />
        </div>
      </Grid>
    </ScreenGrid>
  );
}

export default ToxicPeopleGroupPage;
