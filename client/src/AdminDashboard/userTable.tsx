/**
 * A file that contains all the components and logic for the table of users
 * in the AdminDaaashboardPage. The components are ordered in increasing
 * complexity, with the final component being the UserTable at the end of the
 * file.
 */
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PaginationTable, TColumn } from '../components/PaginationTable';
import DeleteUserButton from './DeleteUserButton';
import PromoteUserButton from './PromoteUserButton';
import { useData } from '../util/api';
import { useAppSelector } from '../util/redux/hooks';
import { selectUser } from '../util/redux/slice';
import IUser from '../util/types/user';

interface AdminDashboardRow {
  key: string;
  first: string;
  last: string;
  email: string;
  promote: React.ReactElement;
  remove: React.ReactElement;
}

/**
 * The standalone table component for holding information about the users in
 * the database and allowing admins to remove users and promote users to admins.
 *
 * This component is wrapper component for {@link UserTableBodyWrapper} and
 * handles logic for fetching the data for the user table and showing a loaading
 * icon while the data is loading.
 */
function UserTable() {
  const columns: TColumn[] = [
    { id: 'first', label: 'First Name' },
    { id: 'last', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'promote', label: 'Promote to Admin' },
    { id: 'remove', label: 'Remove User' },
  ];

  function createAdminDashboardRow(
    user: IUser,
    promote: React.ReactElement,
    remove: React.ReactElement,
  ): AdminDashboardRow {
    const { _id, firstName, lastName, email } = user;
    return {
      key: _id,
      first: firstName,
      last: lastName,
      email,
      promote,
      remove,
    };
  }
  const [userList, setUserList] = useState<IUser[]>([]);
  const users = useData('admin/all');
  const self = useAppSelector(selectUser);

  useEffect(() => {
    setUserList(
      users?.data.filter(
        (entry: IUser) => entry && entry.email && entry.email !== self.email,
      ),
    );
  }, [users, self]);

  const removeUser = (user: IUser) => {
    setUserList(
      userList.filter(
        (entry: IUser) => entry && entry.email && entry.email !== user.email,
      ),
    );
  };

  const updateAdmin = (email: string) => {
    setUserList(
      userList.map((entry) => {
        if (entry.email !== email) {
          return entry;
        }
        const newEntry = entry;
        newEntry.admin = true;
        return newEntry;
      }),
    );
  };

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
