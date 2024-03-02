import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import useAlert from '../util/hooks/useAlert.tsx';

function AlertPopup() {
  const { type, text } = useAlert();

  if (text && type) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message="Notification"
        open
        autoHideDuration={5000}
        key={text}
      >
        <Alert severity={type} sx={{ width: '100%' }} key={text}>
          {text}
        </Alert>
      </Snackbar>
    );
  }
  return <div />;
}

export default AlertPopup;
