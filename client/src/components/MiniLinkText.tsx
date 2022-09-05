import { styled } from '@mui/system';
import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { AnyChildren } from '../assets/types';

/**
 * This is for the little baby links on the bottom of the form
 * (i.e. forgot password, signup, etc.) We style the sizing.
 * @param children, applies styling to the children of the component.
 * @returns
 */
const MiniLinkTextStyled = styled(Typography)(() => ({
  fontSize: '.75em',
  alignItems: 'center',
}));

function MiniLinkText({ children }: AnyChildren) {
  return <MiniLinkTextStyled noWrap={false}>{children}</MiniLinkTextStyled>;
}

export default MiniLinkText;
