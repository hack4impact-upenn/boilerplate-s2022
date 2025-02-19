import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import { useNavigate, Link as RouterLink } from 'react-router-dom';

const ItemButton = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 250,
  height: 100,
  borderRadius: '20px',
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  display: 'flex',
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  fontSize: '2rem',
  color: 'white',
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
  const navigate = useNavigate();
  const handleClick = (role: string) => {
    if (role == "Teacher"){
      navigate("/teacher");
    }
    else if (role == "Student"){
      navigate("/student");
    }
    else if (role == "Admin"){
      navigate("/admin")
    }
  };

  return (
    <Grid
        container
        spacing={7}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ height: "100vh", margin: 0}}
    >

      <Grid>
        <Typography variant="h5" component="h1">
          I am a...
        </Typography>
      </Grid>
      <Grid
        container
        spacing={7}
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <ItemButton onClick={() => handleClick("Teacher")}>
            <span>Teacher</span>
          </ItemButton>
        </Grid>
        <Grid>
          <ItemButton onClick={() => handleClick("Speaker")}>
            <span>Speaker</span>
          </ItemButton>
        </Grid>
        <Grid>
          <ItemButton onClick={() => handleClick("Admin")}>
            <span>Admin</span>
          </ItemButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoginSelectPage;
