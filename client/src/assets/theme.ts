// eslint-disable-next-line import/no-extraneous-dependencies
import { createTheme } from '@mui/material/styles';
import COLORS from './colors';
import 'typeface-hk-grotesk';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      'HK Grotesk',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
          borderRadius: '5px',
          padding: '0.7rem 2rem',
          border: 'none',
          color: 'white',
          textDecoration: 'none',
          transition: 'box-shadow 0.2s ease 0s',
          textAlign: 'center',
          background: '#0069ca',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          letterSpacing: '0.3px',
          lineHeight: '1.5',
        },
      },
    },
  },
});

export default theme;
