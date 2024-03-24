import React from 'react';
import { Typography, Button, Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid.tsx';

/**
 * A page for showing a 404 error to the user and offering a rediect to the
 * the home page.
 */
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
          Go to home page
        </Button>
      </Grid>
    </ScreenGrid>
  );
}

export default NotFoundPage;
