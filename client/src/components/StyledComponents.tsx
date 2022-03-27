/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled } from '@mui/system';
import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';

interface StyledProps {
  children: React.ReactNode;
}

const MiniLinkTextStyled = styled(Typography)(() => ({
  fontSize: '0.75em',
}));

function MiniLinkText({ children }: StyledProps) {
  return <MiniLinkTextStyled noWrap={false}>{children}</MiniLinkTextStyled>;
}

const FormHeaderText = styled(Typography)({
  fontSize: '1.2em',
});

// const ScreenGridStyled = styled(Grid, { name: 'ScreenGrid', label: 'wrapper' })(
//   () => ({
//     container: true,
//     justifyContent: 'center',
//     height: '100vh',
//     flexDirection: 'column',
//     alignItems: 'center',
//   }),
// );

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
// ({
// container: true,
// justifyContent: 'center',
// height: '100vh',
// flexDirection: 'column',
// alignItems: 'center',
// })(() =>
//   ({
//     container: true,
//     justifyContent: 'center',
//     height: '100vh',
//     flexDirection: 'column',
//     alignItems: 'center',
//   });

// const FormGridCol = styled(Grid)({
//   container: true,
//   justifyContent: 'center',
//   spacing: 2,
//   flexDirection: 'column',
//   alignItems: 'center',
// });

function FormGridCol({ children }: StyledProps) {
  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      flexDirection="column"
      alignItems="center"
    >
      {children}
    </Grid>
  );
}

// const FormGridRow = styled(Grid)(() => ({
//   item: true,
//   container: true,
//   justifyContent: 'space-evenly',
//   alignItems: 'flex-end',
//   columnSpacing: 4,
//   rowSpacing: 0,
//   flexDirection: 'row',
// }));

function FormGridRow({ children }: StyledProps) {
  return (
    <Grid
      item
      container
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

// const FormField = styled(Grid)(() => ({
//   item: true,
//   xs: 'auto',
// }));

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
