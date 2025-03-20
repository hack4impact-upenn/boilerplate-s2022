import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Card as MuiCard,
} from '@mui/material';
import React from 'react';

interface Speaker {
  id: number;
  name: string;
  bio: string;
}

interface Request {
  id: number;
  speaker: Speaker;
  status: string;
}

const DEFAULT_IMAGE = '/defaultprofile.jpg';

function SpeakerRequestCard({ speaker, status }: Request) {
  return (
    <MuiCard sx={{ width: 300, height: 320, display: 'flex', flexDirection: 'column', borderRadius: '16px', boxShadow: 3 }}>
      <CardMedia 
        sx={{ height: 140, borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} 
        image={DEFAULT_IMAGE} 
        title={speaker.name} 
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {speaker.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {speaker.bio}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" sx={{ borderRadius: '8px' }}>{status}</Button>
      </CardActions>
    </MuiCard>
  );
}

export default SpeakerRequestCard;
