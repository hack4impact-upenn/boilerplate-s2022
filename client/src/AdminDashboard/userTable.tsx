import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { PaginationTable, TColumn } from '../components/renamePaginationTable';
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
/**
 * A component creates {@link PaginationTable} component with the users as the data.
 * @param users - the list of users to display
 * @param removeUser - the function to call when the remove button is clicked
 * @param updateAdmin - the function to call when the promote button is clicked
 *
 */
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

/**
 * A wrapper component for {@link UserTableBody} that contains the state of the frontend list of users. Upon a change of state, the UserTableBody child component is rerendered. The removeUser and updateAdmin functions are defined here. (TO BE REIMPLEMENTED FOR EFFICIENCY)
 * @param users - the list of users to display
 * @returns a page containing a paginated user table
 */
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

/**
 * A wrapper component for {@link UserTableBodyWrapper} that fetches the data for the user table.
 */
function UserTable() {
  const users = useData('admin/all');
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
