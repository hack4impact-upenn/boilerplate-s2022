import * as React from 'react';
import { styled } from '@mui/system';
import { Grid, Typography, Button } from '@mui/material';


const MiniLinkText = styled(Typography)({
  fontSize: 12,
  textDecoration: 'none',
});

const FormHeaderText = styled(Typography)({
  fontSize: "h5.fontSize",
});

const ScreenGrid = styled(Grid)({
  container: "true",
  justifyContent: "center",
  height: "100vh",
  direction: "column",
  alignItems: "center",
});

const FormGridCol = styled(Grid)({
  container: "true",
  justifyContent: "center",
  spacing: 2,
  direction: "column",
  alignItems: "center",
});

const FormGridRow = styled(Grid)({
  item: "true",
  container: "true",
  direction: "row",
  justifyContent: "space-evenly",
  alignItems: "flex-end",
  xs: "auto",
  columnSpacing: 4,
  rowSpacing: 0,
});

const FormField  = styled(Grid)({
  item: "true",
  xs: "auto",
});

const SubmitButton = styled(Button)({
  type: "submit",
  variant: "contained",
  color: "primary",
})


export {MiniLinkText, FormHeaderText,  ScreenGrid, FormGridCol, FormGridRow, FormField, SubmitButton};
