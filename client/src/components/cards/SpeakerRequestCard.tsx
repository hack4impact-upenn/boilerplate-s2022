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
  id: string;
  name: string;
  bio: string;
}

interface Request {
  id: string;
  speaker: Speaker;
  status: string;
}


const DEFAULT_IMAGE = '/defaultprofile.jpg';

function SpeakerRequestCard({ id, speaker, status }: Request) {
  return (
    <MuiCard sx={{ width: 300, height: 300, display: 'flex', flexDirection: 'column' }}>
      <CardMedia sx={{ height: 140 }} image={DEFAULT_IMAGE} title={speaker.name} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {speaker.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {speaker.bio}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{status}</Button>
      </CardActions>
    </MuiCard>
  );
}

export default SpeakerRequestCard;
