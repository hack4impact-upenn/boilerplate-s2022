import React from 'react';
import { styled } from '@mui/system';
import SearchBar from '../components/search_bar/SearchBar';
import SpeakerCard from '../components/cards/SpeakerCard';
import AdminSidebar from '../components/admin_sidebar/AdminSidebar';
import TopBar from '../components/top_bar/TopBar';
import './AdminDashboard.css';
import { Typography, Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid.tsx';
import UserTable from './UserTable.tsx';
import InviteUserButton from '../components/buttons/InviteUserButton.tsx';

interface Speaker {
  id: number;
  name: string;
  bio: string;
}

const FlexDiv = styled('div')({
  display: 'flex',
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIcon = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const InputRoot = styled('div')({
  color: 'inherit',
});

const CardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',  // Corrected property name
  gap: '20px',
  justifyContent: 'space-around', // Changed from `justify-items`
});

const InputInput = styled('input')(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '20ch',
  },
}));

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));


function AdminUsersPage() {
return (
    <FlexDiv>
      <TopBar />
      <AdminSidebar />
      <div className='main-window'>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h2">Welcome to the Admin Dashboard</Typography>
          </Grid>
          <Grid item container width="60vw" justifyContent="flex-end">
            <InviteUserButton />
          </Grid>
          <Grid item>
            <div style={{ height: '60vh', width: '60vw' }}>
              <UserTable />
            </div>
          </Grid>
        </Grid>
      </div>
    </FlexDiv>
  );
}

export default AdminUsersPage;
