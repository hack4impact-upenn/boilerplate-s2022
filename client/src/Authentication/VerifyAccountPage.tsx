import React, { useState, useEffect } from 'react';
import { Link, CircularProgress, Grid, Typography } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { MiniLinkText } from '../components/grid';
import { verifyAccount } from './api';
import Gridd from '../components/ScreenGrid';

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
        setMessage('Unable to verify account');
        setLoading(false);
      });
  }, [token]); // Only runs when there is a change in token

  return loading ? (
    <Gridd>
      <CircularProgress />
    </Gridd>
  ) : (
    <Gridd>
      <Grid item>
        <Typography variant="h5">{message}</Typography>
      </Grid>
      <Grid item>
        <MiniLinkText>
          Back to{' '}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </MiniLinkText>
      </Grid>
    </Gridd>
  );
}

export default VerifyAccountPage;
