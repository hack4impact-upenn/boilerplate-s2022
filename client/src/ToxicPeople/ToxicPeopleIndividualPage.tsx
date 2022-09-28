import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Typography,
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  List,
  ListItem,
  ListSubheader,
} from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import UserTable from '../AdminDashboard/UserTable';
import { useData } from '../util/api';
import IToxicPerson from '../util/types/toxicpeople';
import { useAppSelector } from '../util/redux/hooks';
import { selectUser } from '../util/redux/slice';

/**
 * A page only accessible to admins that displays all users in a table and allows Admin to delete users from admin and promote users to admin.
 */
function ToxicPeopleIndividualPage() {
  const { search } = useLocation();
  const firstName = new URLSearchParams(search).get('firstName');
  const lastName = new URLSearchParams(search).get('lastName');
  console.log('heeeeeeee');
  console.log(firstName);
  console.log(lastName);

  const [currUser, setUser] = useState<IToxicPerson>();
  const user = useData(
    `toxicperson?firstName=${firstName}&lastName=${lastName}`,
  );
  const self = useAppSelector(selectUser);

  useEffect(() => {
    setUser(user?.data);
  }, [user, self]);

  console.log(user);
  console.log('DAAAAATA');

  if (!currUser) {
    return (
      <div style={{ width: '0', margin: 'auto' }}>
        <CircularProgress size={80} />
      </div>
    );
  }

  console.log(currUser);

  return (
    <Grid container>
      <Grid container justifyContent="center" padding="50px">
        <Grid
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          margin="20px"
        >
          <Typography variant="h2">{`${currUser.firstName} ${currUser.lastName}`}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" spacing={40}>
        <Grid item />
        <Grid item>
          <Box
            component="img"
            sx={{
              height: 300,
              width: 300,
              maxHeight: { xs: 300, md: 300 },
              maxWidth: { xs: 300, md: 300 },
            }}
            alt="The house from the offer."
            src={currUser.pictureUrl}
          />
        </Grid>
        <Grid item>
          <Typography>Toxic Traits:</Typography>
          <List>
            {currUser.toxicTraits.map((trait) => (
              <ListItem sx={{ display: 'list-item' }}>{`${trait}`}</ListItem>
            ))}
          </List>
        </Grid>
        <Grid item />
      </Grid>
    </Grid>
  );
}

export default ToxicPeopleIndividualPage;
