import React, { useState } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';

function NotFoundPage() {
  return (
    <ScreenGrid>
      <Grid item>
        <Typography variant="h1">404</Typography>
      </Grid>
      <Grid item>
        <Typography>
          The page you&apos;re looking for doesn&apos;t exist
        </Typography>
      </Grid>
      <Grid item>
        <Button href="/home" variant="text">
          Go To home
        </Button>
      </Grid>
    </ScreenGrid>
  );
}

export default NotFoundPage;
