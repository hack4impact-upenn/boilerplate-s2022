import React from 'react';
import { Grid } from '@mui/material';
import { AnyChildren } from '../../util/types/generic.ts';

/**
 * A component to create a Form with the {@link Grid} component by specifying
 * the styling of the parent Grid container and the children.
 * @param children The {@link AnyChildren} containing the child {@link Grid} item
 * components that should compose the content of the form.
 * @returns A {@link Grid} container with appropriate styling for a Form
 */
function FormGrid({ children }: AnyChildren) {
  return (
    <Grid
      item
      container
      direction="column"
      rowSpacing={3}
      xs={4}
      fontSize="0.75em"
    >
      {children}
    </Grid>
  );
}

export default FormGrid;
