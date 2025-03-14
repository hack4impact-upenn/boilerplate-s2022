import {
    Button,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Card as MuiCard,
  } from '@mui/material';
  import React from 'react';
  
  interface Speakers {
    id: number;
    name: string;
    bio: string;
  }
  
  
  const DEFAULT_IMAGE = '/defaultprofile.jpg';
  
  function SpeakerCard({ id, name, bio }: Speakers) {
    return (
      <MuiCard sx={{ width: 300, height: 300, display: 'flex', flexDirection: 'column' }}>
        <CardMedia sx={{ height: 140 }} image={DEFAULT_IMAGE} title={name} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {bio}
          </Typography>
        </CardContent>
      </MuiCard>
    );
  }
  
  export default SpeakerCard;
  