import React from 'react';
import { Grid } from '@mui/material';
import { AnyChildren } from '../util/types/generic.ts';

/**
 * This styles a the whole screen as a grid component, serves as a wrapper to ensure
 * that we know what role it plays, as well as height as the whole screen, spacing, and resizing
 * @param children The {@link AnyChildren} representing the components of the screen.
 * @returns
 */
function ScreenGrid({ children }: AnyChildren) {
  return (
    <Grid
      container
      xs={12}
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {children}
    </Grid>
  );
}

export default ScreenGrid;
