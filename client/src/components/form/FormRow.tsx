import React from 'react';
import { Grid } from '@mui/material';
import { AnyChildren } from '../../util/types/generic.ts';

/**
 * A component for formatting rows in {@link FormGrid}
 * with the {@link Grid} component
 * @param children The {@link AnyChildren} containing the child {@link Grid} item
 * components that should compose the content of the form.
 * @returns A {@link Grid} item container with appropriate styling for a Form row
 */
function FormRow({ children }: AnyChildren) {
  return (
    <Grid
      item
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      columnSpacing={1}
    >
      {children}
    </Grid>
  );
}

export default FormRow;
