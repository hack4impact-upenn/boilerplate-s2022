import React from 'react';
import { styled } from '@mui/system';
import SearchBar from './components/search_bar/SearchBar';
import SpeakerCard from './components/cards/SpeakerCard';
import Sidebar from './sidebar/Sidebar';

interface Speaker {
  id: string;
  name: string;
  bio: string;
}

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

const speakers = [
  { id: 1, name: 'Alice Johnson', bio: 'Expert in AI and ML' }, 
  { id: 2, name: 'Khoi', bio: 'hi pmtls' },
  { id: 3, name: 'Edward', bio: 'hello pmtls' }
];



function SearchSpeaker() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <Root>
      <Sidebar />
      <Content>
        <SearchBar onSearch={handleSearch} placeholder="Type your search..." />
        <div className="max-width-wrapper">
          <CardContainer>
            {speakers.length > 0 ? (
              speakers.map((speaker) => (
                <SpeakerCard key={speaker.id} id={speaker.id} name={speaker.name} bio={speaker.bio} />
              ))
            ) : (
              <p>No speakers found</p>
            )}
            </CardContainer>
          </div>
      </Content>
    </Root>
  );
}

export default SearchSpeaker;
