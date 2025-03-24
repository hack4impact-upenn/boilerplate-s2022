import React from 'react';
import { styled } from '@mui/system';
import SpeakerRequestCard from '../components/cards/SpeakerRequestCard';
import Sidebar from '../components/teacher_sidebar/Sidebar';
import TopBar from '../components/top_bar/TopBar';
import './TeacherPage.css';

interface Speaker {
  id: string;
  name: string;
  bio: string;
}


const CardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap', // Corrected property name
  gap: '20px',
  justifyContent: 'flex-start', // Changed from `justify-items`
});

const Section = styled('div')({
  marginBottom: '40px',
});

const SectionTitle = styled('h2')({
  textAlign: 'left',
});

const speakers: Speaker[] = [
  { id: 'aj', name: 'Alice Johnson', bio: 'Expert in AI and ML' }, 
  { id: 'kd', name: 'Khoi', bio: 'hi pmtls' },
  { id: 'ez', name: 'Edward', bio: 'hello pmtls' },
  { id: '67abfdb64fdf51a6a823d617', name: 'Evelyn', bio: 'meow' },
];

const requests = [
  { id: 1, speaker: speakers[0], status: 'upcoming' }, 
  { id: 2, speaker: speakers[1], status: 'pending' },
  { id: 3, speaker: speakers[2], status: 'archived' }, 
  { id: 4, speaker: speakers[3], status: 'upcoming' },
];

function TeacherRequestSpeakerPage() {
  return (
    <div className="flex-div">
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
                  speakerid={req.speaker.id} 
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
                  speakerid={req.speaker.id} 
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
                  speakerid={req.speaker.id} 
                />
              ))}
            </CardContainer>
          </Section>
        </div>
      </div>
    </div>
  );
}

export default TeacherRequestSpeakerPage;
