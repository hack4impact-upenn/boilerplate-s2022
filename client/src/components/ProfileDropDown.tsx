import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { SxProps, Theme } from '@mui/material/styles';
import COLORS from '../assets/colors';

interface ProfileDropDownProps {
    sx?: SxProps<Theme>;
}

function ProfileDropDown({sx}: ProfileDropDownProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    backgroundColor: COLORS.lightGray,
                    borderRadius: '5px',
                    padding: '10px 12px',
                    border: 2,
                    borderColor: COLORS.primaryDark,
                }}
                onClick={handleMenu}
            >
                <AccountCircle sx={{ ...sx, marginRight: '4px' }} />
                <Typography sx={{ color: 'black', fontSize: '14px' }}>Khoi Ding Dong</Typography>
            </Box>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/account-settings">Account Settings</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
            </Menu>
        </>
    );
}

export default ProfileDropDown;
