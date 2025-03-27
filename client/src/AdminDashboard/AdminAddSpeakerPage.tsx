import React from 'react';
import { styled } from '@mui/system';
import AdminSidebar from '../components/admin_sidebar/AdminSidebar';
import TopBar from '../components/top_bar/TopBar';
import {
  Box,
  TextField,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';

interface SpeakerFormState {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  bio: string;
  location: string;
  speakingFormat: 'in-person' | 'virtual' | 'both' | '';
}

const initialFormState: SpeakerFormState = {
  firstName: '',
  lastName: '',
  email: '',
  organization: '',
  bio: '',
  location: '',
  speakingFormat: '',
};

function AdminUsersPage() {
  const [formState, setFormState] =
    React.useState<SpeakerFormState>(initialFormState);

  // Update text/textarea fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update radio button for speaking format
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      speakingFormat: e.target.value as 'in-person' | 'virtual' | 'both',
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your submission logic (e.g., API call)
    console.log('Form submitted:', formState);
  };

  return (
    <div className="flex-div">
      <TopBar />
      <AdminSidebar />

      {/* Main Content Area */}
      <Box className="main-window">
        <Typography variant="h4" gutterBottom>
          Speaker Submission Form
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2, // vertical spacing between fields
          }}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Organization"
            name="organization"
            value={formState.organization}
            onChange={handleChange}
            required
          />
          <TextField
            label="Bio (optional)"
            name="bio"
            multiline
            rows={3}
            variant="outlined"
            value={formState.bio}
            onChange={handleChange}
          />
          <TextField
            label="Location (optional)"
            name="location"
            value={formState.location}
            onChange={handleChange}
          />

          <FormLabel component="legend">
            Preferred Speaking Format (optional)
          </FormLabel>
          <RadioGroup
            row
            name="speakingFormat"
            value={formState.speakingFormat}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="in-person"
              control={<Radio />}
              label="In-Person"
            />
            <FormControlLabel
              value="virtual"
              control={<Radio />}
              label="Virtual"
            />
            <FormControlLabel value="both" control={<Radio />} label="Both" />
          </RadioGroup>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ alignSelf: 'flex-start' }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default AdminUsersPage;
