import React from 'react';
import { DeleteUserButton, PromoteUserButton } from './buttons';

interface Row {
  key: string;
  first: string;
  last: string;
  email: string;
  promote: React.ReactElement;
  remove: React.ReactElement;
}

interface User {
  _id: string;
  accountType: 'internal' | 'google';
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
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

function createRows(
  users: User[],
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
