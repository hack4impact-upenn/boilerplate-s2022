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
  flexWrap: 'wrap', // Corrected property name
  gap: '20px',
  justifyContent: 'flex-start', // Changed from `justify-items`
});

const InputInput = styled('input')(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '20ch',
  },
}));

const Section = styled('div')({
  marginBottom: '40px',
});

const SectionTitle = styled('h2')({
  textAlign: 'left',
});

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const speakers: Speaker[] = [
  { id: 1, name: 'Alice Johnson', bio: 'Expert in AI and ML' }, 
  { id: 2, name: 'Khoi', bio: 'hi pmtls' },
  { id: 3, name: 'Edward', bio: 'hello pmtls' },
  { id: 4, name: 'Evelyn', bio: 'meow' },
];

const requests = [
  { id: 1, speaker: speakers[0], status: 'upcoming' }, 
  { id: 2, speaker: speakers[1], status: 'pending' },
  { id: 3, speaker: speakers[2], status: 'archived' }, 
  { id: 4, speaker: speakers[3], status: 'upcoming' },
];

function TeacherRequestSpeakerPage() {
  return (
    <FlexDiv>
      <TopBar />
      <Sidebar />
      <div className="main-window">
        <div className="request-stack">
          <Section>
            <SectionTitle>Upcoming Requests</SectionTitle>
            <CardContainer>
              {requests.filter(req => req.status === 'upcoming').map(req => (
                <SpeakerRequestCard 
                  id={req.id} 
                  status={req.status} 
                  speaker={req.speaker} 
                />
              ))}
            </CardContainer>
          </Section>
          
          <Section>
            <SectionTitle>Pending Requests</SectionTitle>
            <CardContainer>
              {requests.filter(req => req.status === 'pending').map(req => (
                <SpeakerRequestCard 
                  id={req.id} 
                  status={req.status} 
                  speaker={req.speaker} 
                />
              ))}
            </CardContainer>
          </Section>
          
          <Section>
            <SectionTitle>Archived Requests</SectionTitle>
            <CardContainer>
              {requests.filter(req => req.status === 'archived').map(req => (
                <SpeakerRequestCard 
                  id={req.id} 
                  status={req.status} 
                  speaker={req.speaker} 
                />
              ))}
            </CardContainer>
          </Section>
        </div>
      </div>
    </FlexDiv>
  );
}

export default TeacherRequestSpeakerPage;
