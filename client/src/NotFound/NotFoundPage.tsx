import styled from 'styled-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid } from '@mui/material';
import COLORS from '../assets/colors';
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
        <Button href="/" variant="text">
          Go To home
        </Button>
      </Grid>
    </ScreenGrid>
  );
}

export default NotFoundPage;
