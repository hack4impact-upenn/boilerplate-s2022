import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Link } from 'react-router-dom';
import ProfileDropDown from './ProfileDropDown'; // Adjust the import path as needed
import COLORS from '../assets/colors'; // Adjust the import path as needed

function TopBar() {
    return (
        <AppBar position="static" style={{ backgroundColor: COLORS.white }}>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        size="large"
                        aria-label="show notifications"
                        color="inherit"
                        component={Link}
                        to="/notifications"
                    >
                        <NotificationsNoneIcon sx={{color: COLORS.primaryDark}} />
                    </IconButton>
                    <ProfileDropDown sx={{color: COLORS.primaryDark}}/>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
