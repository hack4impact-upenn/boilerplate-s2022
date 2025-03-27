import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  FormLabel,
  RadioGroup,
  FormControl,
  Radio,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import SearchBar from '../components/search_bar/SearchBar';
import SpeakerCard from '../components/cards/SpeakerCard';
import AdminSidebar from '../components/admin_sidebar/AdminSidebar';
import TopBar from '../components/top_bar/TopBar';
import './AdminDashboard.css';
import { DEFAULT_IMAGE } from '../components/cards/SpeakerCard';

interface Speaker {
  _id: string;
  userId: string;
  organization: string;
  bio: string;
  location: string;
  inperson: boolean;
  virtual: boolean;
  imageUrl?: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const TEST_SPEAKERS: Speaker[] = [
  {
    _id: '1',
    userId: 'user1',
    organization: 'XXX Foundation',
    bio: 'Expert in environmental education',
    location: 'Virginia, VA',
    inperson: true,
    virtual: false,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww',
    user: {
      firstName: 'Khoi',
      lastName: 'Dinh',
      email: 'khoidinh@example.com',
    },
  },
  {
    _id: '2',
    userId: 'user2',
    organization: 'YYY Foundation',
    bio: 'Expert in ',
    location: 'Hong Kong, Hong Kong',
    inperson: true,
    virtual: false,
    imageUrl:
      'https://media.istockphoto.com/id/1466995518/photo/business-woman-and-worker-portrait-at-office-desk-as-administration-executive-company-manager.jpg?s=612x612&w=0&k=20&c=NvKeG6Fh0_VVfH_N0Ka-5j8284XJhL2VTJfe6IwDkWQ=',
    user: {
      firstName: 'Edward',
      lastName: 'Zhang',
      email: 'edwardzhang@example.com',
    },
  },
  {
    _id: '3',
    userId: 'user3',
    organization: 'Climate Action Network',
    bio: 'Climate change educator',
    location: 'Boston, MA',
    inperson: false,
    virtual: false,
    imageUrl:
      'https://t4.ftcdn.net/jpg/02/42/52/27/360_F_242522709_ZhoDmO1L1PHkL6yvVVNutSBGsk1Ob7m0.jpg',
    user: {
      firstName: 'Carol',
      lastName: 'Davis',
      email: 'carol@example.com',
    },
  },
];

const CardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'flex-start',
  padding: '20px',
});

const ActionButton = styled(Button)({
  margin: '10px',
});

function AdminAllSpeakerPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [filteredSpeakers, setFilteredSpeakers] = useState<Speaker[]>([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    bio: '',
    location: '',
    imageUrl: '',
    speakingFormat: 'in-person' as 'in-person' | 'virtual' | 'both',
  });

  // Fetch speakers on component mount
  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      // Comment out the API call temporarily
      // const response = await fetch('/api/speaker/all');
      // if (!response.ok) throw new Error('Failed to fetch speakers');
      // const data = await response.json();

      // Use test data instead
      setSpeakers(TEST_SPEAKERS);
      setFilteredSpeakers(TEST_SPEAKERS);
    } catch (error) {
      console.error('Error fetching speakers:', error);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = speakers.filter(
      (speaker) =>
        speaker.user?.firstName.toLowerCase().includes(query.toLowerCase()) ||
        speaker.user?.lastName.toLowerCase().includes(query.toLowerCase()) ||
        speaker.organization.toLowerCase().includes(query.toLowerCase()) ||
        speaker.location.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredSpeakers(filtered);
  };

  const handleEdit = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setEditForm({
      firstName: speaker.user?.firstName || '',
      lastName: speaker.user?.lastName || '',
      email: speaker.user?.email || '',
      organization: speaker.organization,
      bio: speaker.bio,
      location: speaker.location,
      imageUrl: speaker.imageUrl || '',
      speakingFormat: speaker.inperson ? 'in-person' : 'virtual',
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (speakerId: string) => {
    if (window.confirm('Are you sure you want to delete this speaker?')) {
      try {
        const response = await fetch(`/api/speaker/${speakerId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to delete speaker');
        fetchSpeakers(); // Refresh the list
      } catch (error) {
        console.error('Error deleting speaker:', error);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedSpeaker) return;

    try {
      // Update user information
      const userResponse = await fetch(`/api/user/${selectedSpeaker.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          email: editForm.email,
        }),
      });

      if (!userResponse.ok)
        throw new Error('Failed to update user information');

      // Update speaker information
      const speakerResponse = await fetch(
        `/api/speaker/${selectedSpeaker._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            organization: editForm.organization,
            bio: editForm.bio,
            location: editForm.location,
            imageUrl: editForm.imageUrl,
            inperson:
              editForm.speakingFormat === 'in-person' ||
              editForm.speakingFormat === 'both',
            virtual:
              editForm.speakingFormat === 'virtual' ||
              editForm.speakingFormat === 'both',
          }),
        },
      );

      if (!speakerResponse.ok)
        throw new Error('Failed to update speaker profile');

      setIsEditDialogOpen(false);
      fetchSpeakers(); // Refresh the list
    } catch (error) {
      console.error('Error updating speaker:', error);
      // You might want to add error handling UI here
    }
  };

  const downloadXML = () => {
    // Create XML string
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<speakers>\n';
    speakers.forEach((speaker) => {
      xml += `  <speaker>\n`;
      xml += `    <name>${speaker.user?.firstName} ${speaker.user?.lastName}</name>\n`;
      xml += `    <email>${speaker.user?.email}</email>\n`;
      xml += `    <organization>${speaker.organization}</organization>\n`;
      xml += `    <bio>${speaker.bio}</bio>\n`;
      xml += `    <location>${speaker.location}</location>\n`;
      xml += `    <inperson>${speaker.inperson}</inperson>\n`;
      xml += `  </speaker>\n`;
    });
    xml += '</speakers>';

    //  download XML
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'speakers.xml';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-div">
      <TopBar />
      <AdminSidebar />
      <div className="main-window">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
          }}
        >
          <Typography variant="h4">All Speakers</Typography>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={downloadXML}
          >
            Download XML
          </Button>
        </Box>

        <SearchBar onSearch={handleSearch} placeholder="Search speakers..." />

        <CardContainer>
          {filteredSpeakers.map((speaker) => (
            <Box key={speaker._id} sx={{ position: 'relative' }}>
              <SpeakerCard
                id={speaker._id}
                name={`${speaker.user?.firstName} ${speaker.user?.lastName}`}
                bio={speaker.bio}
                organization={speaker.organization}
                location={speaker.location}
                imageUrl={speaker.imageUrl}
              />
              <Box
                sx={{ position: 'absolute', top: 5, right: 5, display: 'flex' }}
              >
                <IconButton onClick={() => handleEdit(speaker)} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(speaker._id)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </CardContainer>

        {/* Edit Dialog */}
        <Dialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Edit Speaker</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 1 }}>
              <TextField
                fullWidth
                label="First Name"
                value={editForm.firstName}
                onChange={(e) =>
                  setEditForm({ ...editForm, firstName: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Last Name"
                value={editForm.lastName}
                onChange={(e) =>
                  setEditForm({ ...editForm, lastName: e.target.value })
                }
              />
            </Box>

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="Organization"
              value={editForm.organization}
              onChange={(e) =>
                setEditForm({ ...editForm, organization: e.target.value })
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="Bio"
              multiline
              rows={4}
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="Location"
              value={editForm.location}
              onChange={(e) =>
                setEditForm({ ...editForm, location: e.target.value })
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="Image URL"
              value={editForm.imageUrl}
              onChange={(e) =>
                setEditForm({ ...editForm, imageUrl: e.target.value })
              }
              helperText="Enter URL for speaker's profile image"
            />

            {/* Preview the image if URL is provided */}
            {editForm.imageUrl && (
              <Box
                sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}
              >
                <img
                  src={editForm.imageUrl}
                  alt="Profile preview"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = DEFAULT_IMAGE;
                    target.onerror = null;
                  }}
                />
              </Box>
            )}

            <FormLabel component="legend" sx={{ mt: 2 }}>
              Speaking Format
            </FormLabel>
            <RadioGroup
              value={editForm.speakingFormat}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  speakingFormat: e.target.value as
                    | 'in-person'
                    | 'virtual'
                    | 'both',
                })
              }
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AdminAllSpeakerPage;
