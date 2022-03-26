import { styled } from '@mui/system';
import { Grid, Typography } from '@mui/material';

const MiniLinkText = styled(Typography)({
  fontSize: '0.75em',
  noWrap: true,
});

const FormHeaderText = styled(Typography)({
  fontSize: '1.2em',
});

const ScreenGrid = styled(Grid)({
  container: true,
  justifyContent: 'center',
  height: '100vh',
  flexDirection: 'column',
  alignItems: 'center',
});

const FormGridCol = styled(Grid)({
  container: true,
  justifyContent: 'center',
  spacing: 2,
  flexDirection: 'column',
  alignItems: 'center',
});

const FormGridRow = styled(Grid)({
  item: true,
  container: true,
  justifyContent: 'space-evenly',
  alignItems: 'flex-end',
  columnSpacing: 4,
  rowSpacing: 0,
  flexDirection: 'row',
});

const FormField = styled(Grid)({
  item: true,
  xs: 'auto',
});

export {
  MiniLinkText,
  FormHeaderText,
  ScreenGrid,
  FormGridCol,
  FormGridRow,
  FormField,
};
