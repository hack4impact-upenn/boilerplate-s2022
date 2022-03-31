/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled } from '@mui/system';
import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';

interface StyledProps {
  children: React.ReactNode;
}

/**
 * This is for the little baby links on the bottom of the form
 * (i.e. forgot password, signup, etc.) We style the sizing and the lack of wrapping.
 * @param param0
 * @returns
 */
const MiniLinkTextStyled = styled(Typography)(() => ({
  fontSize: '0.75em',
}));

function MiniLinkText({ children }: StyledProps) {
  return <MiniLinkTextStyled noWrap={false}>{children}</MiniLinkTextStyled>;
}

/**
 * This stylesthe form's header to just have a larger font size
 * @param param0
 * @returns
 */
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

/**
 * This styles a the whole screen as a grid component, serves as a wrapper to ensure
 * that we know what role it plays, as well as height as the whole screen, spacing, and resizing
 * @param param0
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

/**
 * This styles a form's components if we want them in a column, serves as a wrapper to ensure
 * that we know what role it plays in the larger grid, as well as width, spacing, and resizing
 * @param param0
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

// const FormGridRow = styled(Grid)(() => ({
//   item: true,
//   container: true,
//   justifyContent: 'space-evenly',
//   alignItems: 'flex-end',
//   columnSpacing: 4,
//   rowSpacing: 0,
//   flexDirection: 'row',
// }));

/**
 * This styles a form's components if we want them in a row, serves as a wrapper to ensure
 * that we know what role it plays in the larger grid, as well as width, spacing, and resizing
 * @param param0
 * @returns
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

// const FormField = styled(Grid)(() => ({
//   item: true,
//   xs: 'auto',
// }));

/**
 * This just styles a child in the form, serves as a wrapper to ensure
 * that we know what role it plays in the larger grid, as well as width and resizing
 * @param param0
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
