import React, { useState, useEffect } from 'react';
import { Link, CircularProgress } from '@mui/material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import {
  MiniLinkText,
  FormHeaderText,
  ScreenGrid,
  FormGridCol,
  FormField,
} from '../components/grid';
import { verifyAccount } from './api';

function VerifyAccountPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { token } = useParams();

  useEffect(() => {
    verifyAccount(token || 'missing token')
      .then((res) => {
        if (res.error) {
          setMessage('Unable to verify account');
          setLoading(false);
        } else {
          setMessage('Account successfully verified!');
          setLoading(false);
        }
      })
      .catch((e) => {
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
      <FormGridCol>
        <FormField>
          <FormHeaderText>{message}</FormHeaderText>
        </FormField>
        <FormField>
          <MiniLinkText>
            Back to{' '}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </MiniLinkText>
        </FormField>
      </FormGridCol>
    </ScreenGrid>
  );
}

export default VerifyAccountPage;
