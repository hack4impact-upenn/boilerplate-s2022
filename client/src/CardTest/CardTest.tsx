import React from 'react';
import styled from 'styled-components';
import SpeakerCard from '../components/SpeakerCard';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-items: space-around;
`;

function CardTest() {
  return (
    <CardContainer>
      <SpeakerCard />
      <SpeakerCard />
      <SpeakerCard />
      <SpeakerCard />
      <SpeakerCard />
    </CardContainer>
  );
}
export default CardTest;
