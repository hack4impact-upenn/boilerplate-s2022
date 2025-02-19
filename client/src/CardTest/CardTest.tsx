import React from 'react';
import styled from 'styled-components';
import SpeakerCard from '../components/SpeakerCard';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-items: space-around;
`;
interface Speaker {
  id: string;
  name: string;
  bio: string;
}

interface Request {
  id: string;
  speaker: Speaker;
  status: string;
}
function CardTest({ requests }) {
  return (
    <CardContainer>
      {requests.map((request: Request) => (
        <SpeakerCard
          key={request.id}
          speaker={request.speaker}
          status={request.status}
        />
      ))}
    </CardContainer>
  );
}

export default CardTest;
