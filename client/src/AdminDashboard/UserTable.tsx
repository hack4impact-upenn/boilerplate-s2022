import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PaginationTable, TColumn } from '../components/PaginationTable.tsx';
import DeleteUserButton from './DeleteUserButton.tsx';
import PromoteUserButton from './PromoteUserButton.tsx';
import OrganizationDropdown from './OrganizationDropdown.tsx';
import { useData } from '../util/api.tsx';
import { useAppSelector } from '../util/redux/hooks.ts';
import { selectUser } from '../util/redux/userSlice.ts';
import IUser from '../util/types/user.ts';

interface AdminDashboardRow {
  key: string;
  first: string;
  last: string;
  email: string;
  organization: React.ReactElement;
  promote: React.ReactElement;
  remove: React.ReactElement;
}

function UserTable() {
  // Define columns for the table
  const columns: TColumn[] = [
    { id: 'first', label: 'First Name' },
    { id: 'last', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'organization', label: 'Organization' },
    { id: 'promote', label: 'Promote to Admin' },
    { id: 'remove', label: 'Remove User' },
  ];

  const [userList, setUserList] = useState<IUser[]>([]);
  const users = useData('admin/all');
  const self = useAppSelector(selectUser);

  // Filter out the current logged-in user from the user list
  useEffect(() => {
    setUserList(
      users?.data.filter(
        (entry: IUser) => entry && entry.email && entry.email !== self.email,
      ),
    );
  }, [users, self]);

  // Handle removing a user
  const removeUser = (user: IUser) => {
    setUserList(
      userList.filter(
        (entry: IUser) => entry && entry.email && entry.email !== user.email,
      ),
    );
  };

  // Handle promoting a user
  const updateAdmin = (email: string) => {
    setUserList(
      userList.map((entry) => {
        if (entry.email !== email) {
          return entry;
        }
        const newEntry = { ...entry, admin: true };
        return newEntry;
      }),
    );
  };

  // Create rows for the table
  function createAdminDashboardRow(
    user: IUser,
    promote: React.ReactElement,
    remove: React.ReactElement,
  ): AdminDashboardRow {
    const { _id, firstName, lastName, email, organization } = user;

    return {
      key: _id,
      first: firstName,
      last: lastName,
      email,
      organization: (
        <OrganizationDropdown
          userId={_id}
          currentOrgId={organization || 'No Org'}
        />
      ),
      promote,
      remove,
    };
  }

  // Display loading spinner if user list is not populated
  if (!userList) {
    return (
      <div style={{ width: '0', margin: 'auto' }}>
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <PaginationTable
      rows={userList.map((user: IUser) =>
        createAdminDashboardRow(
          user,
          <DeleteUserButton
            admin={user.admin}
            email={user.email}
            removeRow={() => removeUser(user)}
          />,
          <PromoteUserButton
            admin={user.admin}
            email={user.email}
            updateAdmin={updateAdmin}
          />,
        ),
      )}
      columns={columns}
    />
  );
}

export default UserTable;
