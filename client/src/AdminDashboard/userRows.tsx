import React from 'react';
import { DeleteUserButton, PromoteUserButton } from './buttons';
import IUser from '../util/types/user';

interface Row {
  key: string;
  first: string;
  last: string;
  email: string;
  promote: React.ReactElement;
  remove: React.ReactElement;
}
function createRow(
  key: string,
  first: string,
  last: string,
  email: string,
  promote: React.ReactElement,
  remove: React.ReactElement,
): Row {
  return { key, first, last, email, promote, remove };
}

/**
 * Process a list of users to create the row data type for the user table
 * @param users - the list of users to process
 * @param removeRow - the function to call when the remove button is clicked
 * @param updateAdmin - the function to call when the promote button is clicked
 * @returns
 */
function createRows(
  users: IUser[],
  removeRow: (email: string) => void,
  updateAdmin: (email: string) => void,
): Row[] {
  if (!users) {
    return [];
  }

  return users.map((user) => {
    return createRow(
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

export default createRows;
