import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * A disabled button that displays a loading indicator.
 */
function LoadingButton() {
  return (
    <Button variant="outlined" disabled size="small" sx={{ minWidth: '100px' }}>
      <CircularProgress size={20} />
    </Button>
  );
}

export default LoadingButton;
