import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Card as MuiCard,
} from '@mui/material';
import React from 'react';

interface SpeakerCardProps {
  id: string;
  name: string;
  bio: string;
  organization: string;
  location: string;
  imageUrl?: string;
}

export const DEFAULT_IMAGE = '/defaultprofile.jpg';

function SpeakerCard({
  id,
  name,
  bio,
  organization,
  location,
  imageUrl,
}: SpeakerCardProps) {
  return (
    <MuiCard
      sx={{
        width: 300,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        boxShadow: 3,
      }}
    >
      <CardMedia
        sx={{ height: 400 }}
        image={imageUrl || DEFAULT_IMAGE}
        title={name}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = DEFAULT_IMAGE;
          target.onerror = null;
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {organization} • {location}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {bio}
        </Typography>
      </CardContent>
    </MuiCard>
  );
}

export default SpeakerCard;
