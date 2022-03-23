import * as React from 'react';
import { styled } from '@mui/system';
import { Grid, Typography, Button } from '@mui/material';


const MiniLinkText = styled(Typography)`
  fontSize: 12;
  textDecoration: none;
  noWrap: true;
`;

const FormHeaderText = styled(Typography)`
  fontSize: h5.fontSize;
`;

const ScreenGrid = styled(Grid)`
  container: true;
  justifyContent: center;
  height: 100vh;
  flex-direction: column;
  alignItems: center;
`;

const FormGridCol = styled(Grid)`
  container: true;
  justifyContent: center;
  spacing: 2;
  flex-direction: column;
  alignItems: center;
`;

const FormGridRow = styled(Grid)`
  item: true;
  container: true;
  justifyContent: space-evenly,
  alignItems: flex-end,
  xs: auto;
  columnSpacing: 4;
  rowSpacing: 0;
  flex-direction: row;
`;

const FormField  = styled(Grid)`
  item: true;
  xs: auto;
`;

const SubmitButton = styled(Button)`
  type: submit;
  variant: contained;
  color: primary;
`;


export {MiniLinkText, FormHeaderText,  ScreenGrid, FormGridCol, FormGridRow, FormField, SubmitButton};
