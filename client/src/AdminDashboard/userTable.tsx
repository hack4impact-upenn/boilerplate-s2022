import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PaginationTable, TColumn } from '../components/paginationTable';
import { useData } from '../util/api';
import createRows from './userRows';
import { useAppSelector } from '../util/redux/hooks';
import { selectUser } from '../util/redux/slice';
import IUser from '../util/types/user';
/**
 * We use the pagination table component to load a paginated user table after denoting the
 * column names and data types through ids, Data, and createData. rows is the data that we
 * load into the custom component.
 * @returns a page containing a paginated user table
 */

interface IUsers {
  users: IUser[];
}

interface IUserTableBody {
  users: IUser[];
  removeUser: (email: string) => void;
  updateAdmin: (email: string) => void;
}

function UserTableBody({ users, removeUser, updateAdmin }: IUserTableBody) {
  const rows = createRows(users, removeUser, updateAdmin);

  const columns: TColumn[] = [
    { id: 'first', label: 'First Name' },
    { id: 'last', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'promote', label: 'Promote to Admin' },
    { id: 'remove', label: 'Remove User' },
  ];

  return <PaginationTable rows={rows} columns={columns} />;
}

function UserTableBodyWrapper({ users }: IUsers) {
  const [userList, setUserList] = useState(users);

  const removeUser = (email: string) => {
    setUserList(
      userList.filter((entry) => entry && entry.email && entry.email !== email),
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

  return (
    <UserTableBody
      users={userList}
      removeUser={removeUser}
      updateAdmin={updateAdmin}
    />
  );
}

function UserTable() {
  const users = useData('user/all');
  const self = useAppSelector(selectUser);
  if (!users) {
    return (
      <div style={{ width: '0', margin: 'auto' }}>
        <CircularProgress size={80} />
      </div>
    );
  }
  const userList = users.data.filter(
    (entry: IUser) => entry && entry.email && entry.email !== self.email,
  );
  return <UserTableBodyWrapper users={userList} />;
}

export default UserTable;
