import React from 'react';
import { styled } from '@mui/system';
import SearchBar from '../components/search_bar/SearchBar';
import SpeakerCard from '../components/cards/SpeakerCard';
import AdminSidebar from '../components/admin_sidebar/AdminSidebar';
import TopBar from '../components/top_bar/TopBar';
import './AdminDashboard.css';

interface Speaker {
  id: number;
  name: string;
  bio: string;
}


const CardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',  // Corrected property name
  gap: '20px',
  justifyContent: 'space-around', // Changed from `justify-items`
});


// TODO: REMOVE THIS TEST DATA
const speakers = [
  { id: 1, name: 'Alice Johnson', bio: 'Expert in AI and ML' }, 
  { id: 2, name: 'Khoi', bio: 'hi pmtls' },
  { id: 3, name: 'Edward', bio: 'hello pmtls' }
];



function AdminAllSpeakerPage() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <div className="flex-div">
      <TopBar />
      <AdminSidebar />
      <div className='main-window'>
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
      </div>
    </div>
  );
}

export default AdminAllSpeakerPage;
