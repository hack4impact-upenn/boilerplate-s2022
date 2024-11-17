import React, { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import { getData, putData } from '../util/api.tsx';

interface OrganizationDropdownProps {
  userId: string;
  currentOrgId: string | null;
}

function OrganizationDropdown({
  userId,
  currentOrgId,
}: OrganizationDropdownProps) {
  const [organizations, setOrganizations] = useState<
    { _id: string; organizationName: string }[]
  >([]);
  const [selectedOrg, setSelectedOrg] = useState<string>(
    currentOrgId || 'No Org',
  );
  const [notification, setNotification] = useState<{
    message: string;
    open: boolean;
  }>({
    message: '',
    open: false,
  });

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

  const handleChange = async (event: SelectChangeEvent<string>) => {
    const organizationId = event.target.value as string;
    setSelectedOrg(organizationId);

    try {
      const res = await putData('auth/add-user-to-org', {
        userId,
        organizationId,
      });
      if (res.data.status === 200) {
        setNotification({
          message: `${res.data.message}`,
          open: true,
        });
      } else {
        setNotification({
          message: `Failed to update organization: ${res.data.message}`,
          open: true,
        });
      }
    } catch (error) {
      setNotification({
        message: `Failed to update organization: ${error}`,
        open: true,
      });
    }
  };

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <div>
      <Select value={selectedOrg} onChange={handleChange} displayEmpty>
        <MenuItem value="No Org">No Org</MenuItem>
        {organizations.map((org) => (
          // eslint-disable-next-line no-underscore-dangle
          <MenuItem key={org._id} value={org._id}>
            {org.organizationName}
          </MenuItem>
        ))}
      </Select>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={notification.message}
      />
    </div>
  );
}

export default OrganizationDropdown;
