import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import AdminSidebar from '../components/admin_sidebar/AdminSidebar';
import TopBar from '../components/top_bar/TopBar';
import SpeakerRequestCard from '../components/cards/SpeakerRequestCard';
import './AdminDashboard.css';

type RequestStatus =
  | 'Pending Review'
  | 'Pending Speaker Confirmation'
  | 'Approved'
  | 'Archived';

interface Request {
  _id: string;
  speakerId: string;
  teacherId: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

const Section = styled('div')({
  marginBottom: '40px',
});

const SectionTitle = styled('h2')({
  textAlign: 'left',
  color: '#2c3e50',
  borderBottom: '2px solid #3498db',
  paddingBottom: '10px',
});

const CardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'flex-start',
});

// Test data
const TEST_REQUESTS: Request[] = [
  {
    _id: '1',
    speakerId: 'speaker1',
    teacherId: 'teacher1',
    status: 'Pending Review',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
  },
  {
    _id: '2',
    speakerId: 'speaker2',
    teacherId: 'teacher2',
    status: 'Pending Speaker Confirmation',
    createdAt: '2024-03-19',
    updatedAt: '2024-03-19',
  },
  {
    _id: '3',
    speakerId: 'speaker3',
    teacherId: 'teacher3',
    status: 'Approved',
    createdAt: '2024-03-18',
    updatedAt: '2024-03-18',
  },
  {
    _id: '4',
    speakerId: 'speaker4',
    teacherId: 'teacher4',
    status: 'Archived',
    createdAt: '2024-03-17',
    updatedAt: '2024-03-17',
  },
  {
    _id: '5',
    speakerId: 'speaker5',
    teacherId: 'teacher5',
    status: 'Pending Review',
    createdAt: '2024-03-16',
    updatedAt: '2024-03-16',
  },
];

function AdminRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    // In the future, replace with actual API call
    setRequests(TEST_REQUESTS);
  }, []);

  const handleStatusChange = async (
    requestId: string,
    newStatus: RequestStatus,
  ) => {
    try {
      // TODO:  make API call to update status

      setRequests(
        requests.map((request) =>
          request._id === requestId
            ? { ...request, status: newStatus }
            : request,
        ),
      );
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const RequestCard = ({ request }: { request: Request }) => (
    <Card sx={{ width: 300, mb: 2 }}>
      <CardContent>
        <SpeakerRequestCard
          id={request._id}
          speakerid={request.speakerId}
          status={request.status}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={request.status}
            label="Status"
            onChange={(e) =>
              handleStatusChange(request._id, e.target.value as RequestStatus)
            }
          >
            <MenuItem value="Pending Review">Pending Review</MenuItem>
            <MenuItem value="Pending Speaker Confirmation">
              Pending Speaker Confirmation
            </MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Archived">Archived</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-div">
      <TopBar />
      <AdminSidebar />
      <div className="main-window">
        <Typography variant="h4" sx={{ mb: 4, color: '#2c3e50' }}>
          Speaker Requests Management
        </Typography>

        <Section>
          <SectionTitle>Pending Review</SectionTitle>
          <CardContainer>
            {requests
              .filter((req) => req.status === 'Pending Review')
              .map((request) => (
                <RequestCard key={request._id} request={request} />
              ))}
          </CardContainer>
        </Section>

        <Section>
          <SectionTitle>Pending Speaker Confirmation</SectionTitle>
          <CardContainer>
            {requests
              .filter((req) => req.status === 'Pending Speaker Confirmation')
              .map((request) => (
                <RequestCard key={request._id} request={request} />
              ))}
          </CardContainer>
        </Section>

        <Section>
          <SectionTitle>Approved</SectionTitle>
          <CardContainer>
            {requests
              .filter((req) => req.status === 'Approved')
              .map((request) => (
                <RequestCard key={request._id} request={request} />
              ))}
          </CardContainer>
        </Section>

        <Section>
          <SectionTitle>Archived</SectionTitle>
          <CardContainer>
            {requests
              .filter((req) => req.status === 'Archived')
              .map((request) => (
                <RequestCard key={request._id} request={request} />
              ))}
          </CardContainer>
        </Section>
      </div>
    </div>
  );
}

export default AdminRequestsPage;
