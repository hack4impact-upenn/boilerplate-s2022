import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Typography,
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  CardMedia,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import IToxicPerson from '../util/types/toxicpeople';
import { PaginationTable, TColumn } from '../components/PaginationTable';
import { useData } from '../util/api';
import { useAppSelector } from '../util/redux/hooks';
import { selectUser } from '../util/redux/slice';

function ToxicPeopleTable() {
  const [userList, setUserList] = useState<IToxicPerson[]>([]);
  const users = useData('toxicperson/all');
  const self = useAppSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    setUserList(
      users?.data.filter(
        (entry: IToxicPerson) => entry && entry.firstName && entry.lastName,
      ),
    );
  }, [users, self]);

  console.log('here');
  console.log(userList);

  if (!userList) {
    return (
      <div style={{ width: '0', margin: 'auto' }}>
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <Grid container spacing={2}>
      {userList.map((user) => (
        <Grid item xs={6} md={4}>
          <Card sx={{ maxWidth: 200 }}>
            <CardMedia
              component="img"
              image={user.pictureUrl}
              alt="CardMedia Image Example"
              height="140"
              title="CardMedia Image Example"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {`${user.firstName} ${user.lastName}`}
              </Typography>
            </CardContent>
            <CardActions
              onClick={() =>
                navigate(
                  `/toxicperson?firstName=${user.firstName}&lastName=${user.lastName}`,
                  {
                    replace: true,
                  },
                )
              }
            >
              <Button size="small">Visit Page</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
  <Card />;
}

export default ToxicPeopleTable;
