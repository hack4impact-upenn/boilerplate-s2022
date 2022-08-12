import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingButton() {
  return (
    <Button variant="outlined" disabled size="small" sx={{ minWidth: '100px' }}>
      <CircularProgress size={20} />
    </Button>
  );
}

// eslint-disable-next-line import/prefer-default-export
export { LoadingButton };
