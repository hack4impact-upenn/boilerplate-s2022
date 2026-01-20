import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  AppBar,
  Toolbar,
  Button,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import COLORS from '../../assets/colors.ts';

/**
 * Header component with branding and search bar
 */
function DashboardHeader() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#800020',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to="/dashboard"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              component="img"
              src="/popcorn.avif"
              alt="Popcorn for the People"
              sx={{
                height: 60,
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            to="/order-management"
            sx={{
              color: COLORS.white,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Order Management
          </Button>
          <Button
            component={Link}
            to="/customer-lookup"
            sx={{
              color: COLORS.white,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Customer Lookup
          </Button>
          <Button
            component={Link}
            to="/pricing-management"
            sx={{
              color: COLORS.white,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Pricing Management
          </Button>
          <TextField
            placeholder="Search"
            size="small"
            sx={{
              backgroundColor: COLORS.white,
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
              width: 300,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ color: 'text.secondary' }}>????</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default DashboardHeader;

