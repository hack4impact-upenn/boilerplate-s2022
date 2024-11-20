import { Button, Checkbox, Box } from '@mui/material';
import React, { Dispatch } from 'react';

type ToggleMapButtonProps = {
  setLayerToggle: Dispatch<boolean>;
  toggled: boolean;
};

function ToggleMapButton({ setLayerToggle, toggled }: ToggleMapButtonProps) {
  return (
    <Box sx={{ backgroundColor: 'white', padding: 10, zIndex: 100 }}>
      Toggle Agency
      <Checkbox
        sx={{ position: 'absolute', zIndex: 100, right: 0 }}
        onClick={() => setLayerToggle(!toggled)}
      />
    </Box>
  );
}

export default ToggleMapButton;
