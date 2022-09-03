import React from 'react';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';
import { StyledProps } from '../assets/types';

const FormGridStyled = styled(Grid)(() => ({
  fontSize: '0.75em',
}));

function FormGrid({ children }: StyledProps) {
  return (
    <FormGridStyled
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={2}
    >
      {children}
    </FormGridStyled>
  );
}

export default FormGrid;
