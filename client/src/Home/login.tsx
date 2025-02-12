import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

const ItemButton = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: '#fff',
  width: 250,
  height: 400,
  borderRadius: theme.shape.borderRadius,
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  display: 'flex',
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows[3], // Default shadow

  "&:hover": {
    transform: "translateY(-5px)", // Moves up slightly on hover
    boxShadow: theme.shadows[6], // Increases shadow depth
  },

  ...theme.applyStyles?.('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Image = styled("img")(({ theme }) => ({
  width: "80%",
  maxHeight: "60%",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: theme.spacing(2), // Adds space between image and text
}));

function LoginSelectPage() {
  const handleClick = (role: string) => {
    //console.log(`Clicked on ${role}`);
  };

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", display: "flex" }}
    >
      <Grid xs={10} md={3}>
        <ItemButton onClick={() => handleClick("Teacher")}>
          <Image src={"/images/teacher-stock.jpg"} alt="Teacher" />
          <span>I'm a teacher</span>
        </ItemButton>
      </Grid>
      <Grid xs={10} md={3}>
        <ItemButton onClick={() => handleClick("Speaker")}>
          <Image src={"/images/speaker-stock.jpg"} alt="Speaker" />
          <span>I'm a speaker</span>
        </ItemButton>
      </Grid>
      <Grid xs={10} md={3}>
        <ItemButton onClick={() => handleClick("Admin")}>
          <Image src={"/images/admin-stock.jpg"} alt="Admin" />
          <span>I'm an admin</span>
        </ItemButton>
      </Grid>
    </Grid>
  );
}

export default LoginSelectPage;
