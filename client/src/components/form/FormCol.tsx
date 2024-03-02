/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Grid } from '@mui/material';
import { AnyChildren } from '../../util/types/generic.ts';

/**
 * A component for formatting columns in {@link FormGrid}
 * with the {@link Grid} component
 * @param children The {@link AnyChildren} containing the child {@link Grid} item
 * components that should compose the content of the form.
 * @returns A {@link Grid} item container with appropriate styling for a Form column
 */
function FormCol({ children }: AnyChildren) {
  return (
    <Grid
      item
      container
      direction="column"
      rowSpacing={2}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <>{children}</>
    </Grid>
  );
}

export default FormCol;
