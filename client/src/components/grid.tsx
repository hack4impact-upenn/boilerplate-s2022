import { styled } from '@mui/system';
import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { AnyChildren } from '../assets/types';

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
  fontSize: '.75em',
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
  variant: 'h3',
});

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

export { MiniLinkText, FormHeaderText, ScreenGrid };
