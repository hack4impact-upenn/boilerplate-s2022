import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import { Box, Button } from '@mui/material';
import { deleteData, getData } from '../util/api.tsx';
import { PaginationTable, TColumn } from '../components/PaginationTable.tsx';

interface IKitchenOutcomes {
  _id: string;
  orgId: string;
  year: Date;
  organizationName: string;
  // other properties omitted for brevity
}

interface IProgramOutcomes {
  _id: string;
  orgId: string;
  year: Date;
  // other properties omitted for brevity
}

interface OutcomeRow {
  key: string;
  date: string;
  year: number;
  type: string;
}

function OrgTable() {
  const [organizations, setOrganizations] = useState<
    { _id: string; organizationName: string }[]
  >([]);
  const [selectedOrgId, setSelectedOrgId] = useState<string>('No Org');
  const [kitchenOutcomes, setKitchenOutcomes] = useState<IKitchenOutcomes[]>(
    [],
  );
  const [programOutcomes, setProgramOutcomes] = useState<IProgramOutcomes[]>(
    [],
  );
  const [notification, setNotification] = useState<{
    message: string;
    open: boolean;
  }>({
    message: '',
    open: false,
  });

  const columns: TColumn[] = [
    { id: 'date', label: 'Date' },
    { id: 'year', label: 'Year' },
    { id: 'type', label: 'Type' },
    { id: 'action', label: 'Action' },
  ];

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await getData('organization/organizations');
        setOrganizations(res.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };
    fetchOrganizations();
  }, []);

  const handleOrgChange = async (event: SelectChangeEvent<string>) => {
    const organizationId = event.target.value;
    setSelectedOrgId(organizationId);

    try {
      const [kitchenRes, programRes] = await Promise.all([
        getData(`kitchen_outcomes/get/all/${organizationId}`),
        getData(`program_outcomes/get/all/${organizationId}`),
      ]);

      setKitchenOutcomes(kitchenRes.data);
      setProgramOutcomes(programRes.data);

      setNotification({
        message: 'Outcomes data fetched successfully',
        open: true,
      });
    } catch (error) {
      setNotification({
        message: `Failed to fetch outcomes data: ${error}`,
        open: true,
      });
    }
  };

  const handleDelete = async (id: string, type: 'kitchen' | 'program') => {
    try {
      await deleteData(`${type}_outcomes/delete/${id}`);
      setNotification({
        message: 'Outcome deleted successfully',
        open: true,
      });
      // Refresh the outcomes data
      handleOrgChange({
        target: { value: selectedOrgId },
      } as SelectChangeEvent<string>);
    } catch (error) {
      setNotification({
        message: `Failed to delete outcome: ${error}`,
        open: true,
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const createOutcomeRows = () => {
    const kitchenRows: OutcomeRow[] = kitchenOutcomes.map((outcome) => ({
      // eslint-disable-next-line no-underscore-dangle
      key: outcome._id,
      date: new Date(outcome.year).toISOString().slice(0, 10),
      year: new Date(outcome.year).getUTCFullYear(),
      type: 'Kitchen Outcome',
      action: (
        <Button
          variant="outlined"
          color="error"
          // eslint-disable-next-line no-underscore-dangle
          onClick={() => handleDelete(outcome._id, 'kitchen')}
          sx={{
            borderColor: 'error.main', // Red outline
            color: 'error.main', // Red text color
            '&:hover': {
              borderColor: 'error.dark', // Darker red on hover
              backgroundColor: 'error.light', // Light red background on hover
            },
          }}
        >
          Delete
        </Button>
      ),
    }));

    const programRows: OutcomeRow[] = programOutcomes.map((outcome) => ({
      // eslint-disable-next-line no-underscore-dangle
      key: outcome._id,
      date: new Date(outcome.year).toISOString().slice(0, 10),
      year: new Date(outcome.year).getUTCFullYear(),
      type: 'Program Outcome',
      action: (
        <Button
          variant="outlined"
          color="error"
          // eslint-disable-next-line no-underscore-dangle
          onClick={() => handleDelete(outcome._id, 'program')}
          sx={{
            borderColor: 'error.main', // Red outline
            color: 'error.main', // Red text color
            '&:hover': {
              borderColor: 'error.dark', // Darker red on hover
              backgroundColor: 'error.light', // Light red background on hover
            },
          }}
        >
          Delete
        </Button>
      ),
    }));

    return [...kitchenRows, ...programRows].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  };

  if (!organizations.length) {
    return (
      <div style={{ width: '0', margin: 'auto' }}>
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <div>
      {/* Organization Dropdown */}
      <Select value={selectedOrgId} onChange={handleOrgChange} displayEmpty>
        <MenuItem value="No Org">Select Organization</MenuItem>
        {organizations.map((org) => (
          // eslint-disable-next-line no-underscore-dangle
          <MenuItem key={org._id} value={org._id}>
            {org.organizationName}
          </MenuItem>
        ))}
      </Select>

      <Box mt={2} />

      {/* Outcomes Table */}
      <PaginationTable rows={createOutcomeRows()} columns={columns} />

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        message={notification.message}
      />
    </div>
  );
}

export default OrgTable;
