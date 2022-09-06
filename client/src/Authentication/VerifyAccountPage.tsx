import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { verifyAccount } from './api';
import ScreenGrid from '../components/ScreenGrid';

/**
 * A page users visit to verify their account. Page should be accessed via
 * a link sent to their email and the path should contain a token as a query
 * param for this page to use to make the correct server request.
 */
function VerifyAccountPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { token } = useParams();

  useEffect(() => {
    verifyAccount(token || 'missing token')
      .then(() => {
        setMessage('Account successfully verified!');
        setLoading(false);
      })
      .catch((e) => {
        // Don't want to display server error message to the user
        console.error(e);
        setMessage('Unable to verify account');
        setLoading(false);
      });
  }, [token]); // Only runs when there is a change in token

  return loading ? (
    <ScreenGrid>
      <CircularProgress />
    </ScreenGrid>
  ) : (
    <ScreenGrid>
      <Grid item>
        <Typography variant="h2">{message}</Typography>
      </Grid>
      <Grid item>
        <Button href="/login">Back to Login</Button>
      </Grid>
    </ScreenGrid>
  );
}

export default VerifyAccountPage;
