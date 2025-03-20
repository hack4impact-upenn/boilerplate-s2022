import React from 'react';
import { styled } from '@mui/system';
import SpeakerRequestCard from '../components/cards/SpeakerRequestCard';
import Sidebar from '../components/sidebar/Sidebar';
import TopBar from '../components/top_bar/TopBar';
import './TeacherPage.css';

interface Speaker {
  id: number;
  name: string;
  bio: string;
}

const FlexDiv = styled('div')({
  display: 'flex',
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

const requests = [
    { id: 1, speaker: speakers[0], status: 'upcoming' }, 
    { id: 2, name: speakers[2], status: 'pending' },
    { id: 3, name: speakers[3], status: 'denied' }
]



function TeacherRequestSpeakerPage() {
  return (
    <FlexDiv>
      <TopBar />
      <Sidebar />
      <div className='main-window'>
        <div className="request-stack">
          <CardContainer>
            {/* TODO: FILTER BY REQUEST STATUS TYPE */}
          </CardContainer>
          <CardContainer>
            {speakers.length > 0 ? (
              speakers.map((speaker) => (
                <SpeakerRequestCard key={speaker.id} id={speaker.id} name={speaker.name} bio={speaker.bio} />
              ))
            ) : (
              <p>No speakers found</p>
            )}
            </CardContainer>
        </div>
      </div>
      </FlexDiv>
  );
}

export default TeacherRequestSpeakerPage;
