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

function SpeakerRequestCard({ id, speakerid, status }: Request) {
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const speakerResponse = await getData(`speaker/${speakerid}`);
        if (speakerResponse.error) {
          throw new Error(speakerResponse.error.message);
        }
        setSpeaker(speakerResponse.data);

        const userResponse = await getData(`user/${speakerid}`);
        if (userResponse.error) {
          throw new Error(userResponse.error.message);
        }
        setUser(userResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();
  }, [speakerid]);

  return (
    <MuiCard sx={{ width: 300, height: 320, display: 'flex', flexDirection: 'column', borderRadius: '16px', boxShadow: 3 }}>
      <CardMedia 
        sx={{ height: 140, borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} 
        image={DEFAULT_IMAGE} 
        title={user ? user.firstName : 'Loading...'} 
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {user ? user.firstName : 'Loading...'} 
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {speaker ? speaker.bio : 'Fetching speaker bio...'}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button variant="contained" sx={{ borderRadius: '8px' }}>{status}</Button>
      </CardActions>
    </MuiCard>
  );
}

export default SpeakerRequestCard;
