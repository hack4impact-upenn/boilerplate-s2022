import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Card as MuiCard,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getData } from '../../util/api';

interface Speaker {
  id: string;
  bio: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Request {
  id: string;
  speakerid: string; // speakerid is also the userId
  status: string;
}

const DEFAULT_IMAGE = '/defaultprofile.jpg';

interface FakeSpeakerData {
  firstName: string;
  bio: string;
  imageUrl: string;
}

type FakeSpeakers = {
  [key: string]: FakeSpeakerData;
};

const fakeSpeakers: FakeSpeakers = {
  speaker1: {
    firstName: 'Edward',
    bio: 'Expert in environmental education',
    imageUrl:
      'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg',
  },
  speaker2: {
    firstName: 'Khoi',
    bio: 'Climate change researcher',
    imageUrl:
      'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
  },
  speaker3: {
    firstName: 'Evelyn',
    bio: 'Sustainability consultant',
    imageUrl:
      'https://media.istockphoto.com/id/1389348844/photo/studio-shot-of-a-beautiful-young-woman-smiling-while-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=anRTfD_CkOxRdyFtvsiPopOluzKbhBNEQdh4okZImQc=',
  },
  speaker4: {
    firstName: 'Yeon',
    bio: 'Marine biology specialist',
    imageUrl:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  speaker5: {
    firstName: 'Joy',
    bio: 'Renewable energy expert',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdQLwDqDwd2JfzifvfBTFT8I7iKFFevcedYg&s',
  },
};

function SpeakerRequestCard({ id, speakerid, status }: Request) {
  const speakerData = fakeSpeakers[speakerid as keyof FakeSpeakers] || {
    firstName: 'Unknown',
    bio: 'Speaker bio not available',
    imageUrl: DEFAULT_IMAGE,
  };

  return (
    <MuiCard
      sx={{
        width: 275,
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        boxShadow: 3,
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.02)',
          transition: 'all 0.2s ease-in-out',
        },
      }}
    >
      <CardMedia
        sx={{
          height: 250,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        image={speakerData.imageUrl}
        title={speakerData.firstName}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = DEFAULT_IMAGE;
          target.onerror = null;
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: 600 }}
        >
          {speakerData.firstName}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {speakerData.bio}
        </Typography>
      </CardContent>
    </MuiCard>
  );
}

export default SpeakerRequestCard;
