import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { AnyChildren } from '../../assets/types';

/**
 * A component for formatting columns in {@link FormGrid}
 * with the {@link Grid} component
 * @param children The {@link AnyChildren} containing the child {@link Grid} item
 * components that should compose the content of the form.
 * @returns A {@link Grid} item container with appropriate styling for a Form column
 */
function FormCol({ children }: AnyChildren) {
  return (
    <Grid item container flexDirection="column" alignItems="center" spacing={1}>
      {children}
    </Grid>
  );
}

export default FormCol;