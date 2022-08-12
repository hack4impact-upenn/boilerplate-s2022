import { styled } from '@mui/system';
import React from 'react';
import { Grid, Typography } from '@mui/material';

interface StyledProps {
  children: React.ReactNode;
}

/**
 * This is for the little baby links on the bottom of the form
 * (i.e. forgot password, signup, etc.) We style the sizing.
 * @param children, applies styling to the children of the component.
 * @returns
 */
const MiniLinkTextStyled = styled(Typography)(() => ({
  fontSize: '0.75em',
}));

function MiniLinkText({ children }: StyledProps) {
  return <MiniLinkTextStyled noWrap={false}>{children}</MiniLinkTextStyled>;
}

/**
 * This styles the form's header to just have a larger font size
 * @param children, applies styling to the children of the component.
 * @returns
 */
const FormHeaderText = styled(Typography)({
  fontSize: '1.2em',
});

/**
 * This styles a the whole screen as a grid component, serves as a wrapper to ensure
 * that we know what role it plays, as well as height as the whole screen, spacing, and resizing
 * @param children, applies styling to the children of the component.
 * @returns
 */
function ScreenGrid({ children }: StyledProps) {
  return (
    <Grid
      container
      justifyContent="center"
      height="100vh"
      flexDirection="column"
      alignItems="center"
    >
      {children}
    </Grid>
  );
}

/**
 * This styles a form's components if we want them in a column, serves as a wrapper to ensure
 * that we know what role it plays in the larger grid, as well as width, spacing, and resizing
 * @param children, applies styling to the children of the component.
 * @returns
 */
function FormGridCol({ children }: StyledProps) {
  return (
    <Grid
      container
      justifyContent="center"
      spacing={1.5}
      flexDirection="column"
      alignItems="center"
    >
      {children}
    </Grid>
  );
}

/**
 * This styles a form's components if we want them in a row, serves as a wrapper to ensure
 * that we know what role it plays in the larger grid, as well as width, spacing, and resizing
 * @param children, applies styling to the children of the component.
 * @returns styled grid row component
 */
function FormGridRow({ children }: StyledProps) {
  return (
    <Grid
      item
      container
      xs="auto"
      justifyContent="space-evenly"
      rowSpacing={0}
      columnSpacing={4}
      alignItems="flex-end"
      flexDirection="row"
    >
      {children}
    </Grid>
  );
}

/**
 * This just styles a child in the form, serves as a wrapper to ensure
 * that we know what role it plays in the larger grid, as well as width and resizing
 * @param children, applies styling to the children of the component.
 * @returns
 */
function FormField({ children }: StyledProps) {
  return (
    <Grid item xs="auto">
      {children}
    </Grid>
  );
}

export {
  MiniLinkText,
  FormHeaderText,
  ScreenGrid,
  FormGridCol,
  FormGridRow,
  FormField,
};
