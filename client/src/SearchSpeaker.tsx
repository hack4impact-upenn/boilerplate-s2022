import React from 'react';
import { styled } from '@mui/system';
import SearchBar from './components/search_bar/SearchBar';
import SpeakerCard from './components/SpeakerCard';
import TopBar from './components/TopBar';
import ScreenGrid from './components/ScreenGrid';
import Sidebar from './sidebar/Sidebar';

const Root = styled('div')({
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

function SearchSpeaker() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <Root>
      <Sidebar />
      <Content>
        <SearchBar onSearch={handleSearch} placeholder="Type your search..." />
        <ScreenGrid>
          <SpeakerCard />
          <SpeakerCard />
          <SpeakerCard />
          <SpeakerCard />
          <SpeakerCard />
          <SpeakerCard />
          <SpeakerCard />
          <SpeakerCard />
        </ScreenGrid>
      </Content>
    </Root>
  );
}

export default SearchSpeaker;
