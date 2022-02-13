/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div>
          <Typography variant="h2" gutterBottom>
            Welcome to our new Boilerplate
          </Typography>
          <Button variant="contained" color="secondary">
            Let&apos;s Go
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default App;
