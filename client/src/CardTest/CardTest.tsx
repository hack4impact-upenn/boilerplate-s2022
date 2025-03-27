import React from 'react';
import styled from 'styled-components';
import SpeakerRequestCard from '../components/cards/SpeakerRequestCard';

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
function CardTest({ requests }: { requests: Request[] }) {
  return (
    <CardContainer>
      {requests.map((request: Request) => (
        <SpeakerRequestCard
          key={request.id}
          speaker={request.speaker}
          status={request.status}
          id=""
        />
      ))}
    </CardContainer>
  );
}

export default CardTest;
