import React from 'react';
import { makeStyles, Theme, createStyles } from '@mui/material';
import SearchBar from './components/search_bar/SearchBar';
import SpeakerCard from './components/SpeakerCard';
import TopBar from './components/TopBar';
import ScreenGrid from './components/ScreenGrid';
import Sidebar from './sidebar/Sidebar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    search: {
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
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  })
);

function SearchSpeaker() {
  const classes = useStyles();

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <div className={classes.root}>
      <TopBar />
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SearchBar onSearch={handleSearch} placeholder="Type your search..." />
        <ScreenGrid>
          <SpeakerCard />
          <SpeakerCard />
          <SpeakerCard />
          <SpeakerCard />
        </ScreenGrid>
      </main>
    </div>
  );
}

export default SearchSpeaker;
