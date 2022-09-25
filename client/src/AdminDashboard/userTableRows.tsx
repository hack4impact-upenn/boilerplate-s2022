/**
 * File defining types for the rows used in UserTable and the functions to
 * create them.
 */
import React from 'react';
import DeleteUserButton from './DeleteUserButton';
import PromoteUserButton from './PromoteUserButton';
import IUser from '../util/types/user';

interface AdminDashboardRow {
  key: string;
  first: string;
  last: string;
  email: string;
  promote: React.ReactElement;
  remove: React.ReactElement;
}

function createAdminDashboardRow(
  key: string,
  first: string,
  last: string,
  email: string,
  promote: React.ReactElement,
  remove: React.ReactElement,
): AdminDashboardRow {
  return { key, first, last, email, promote, remove };
}

/**
 * Process a list of users to create the row data type for the {@link UserTable}
 * @param users - the list of users to process
 * @param removeRow - the function to call when the remove button is clicked
 * @param updateAdmin - the function to call when the promote button is clicked
 * @returns
 */
function createUserTableRows(
  users: IUser[],
  removeRow: (email: string) => void,
  updateAdmin: (email: string) => void,
): AdminDashboardRow[] {
  if (!users) {
    return [];
  }

  return users.map((user) => {
    return createAdminDashboardRow(
      // eslint-disable-next-line no-underscore-dangle
      user._id,
      user.firstName,
      user.lastName,
      user.email,
      <DeleteUserButton
        admin={user.admin}
        email={user.email}
        removeRow={removeRow}
      />,
      <PromoteUserButton
        admin={user.admin}
        email={user.email}
        updateAdmin={updateAdmin}
      />,
    );
  });
}

export default createUserTableRows;
