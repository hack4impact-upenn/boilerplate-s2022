import { styled } from '@mui/system';
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { AnyChildren } from '../../assets/types';

/**
 * A wrapper component for formatting various input fields in {@link FormGrid}
 * with the {@link Grid} component
 * @param children The {@link AnyChildren} containing the child {@link Grid} item
 * components that should compose the input field.
 * @returns A {@link Grid} item container with appropriate styling for a Form input
 */
function FormInputField({ children }: AnyChildren) {
  return <Grid item>{children}</Grid>;
}

export default FormInputField;
