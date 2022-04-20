import React, { useState } from 'react';
import { PaginationTable } from '../components/StyledComponents';

function UserPage() {
  interface Data {
    first: string;
    last: string;
    username: string;
    admin: string;
    coolnessRating: number;
  }

  function createData(
    first: string,
    last: string,
    username: string,
    Badmin: boolean,
    coolnessRating: number,
  ): Data {
    const admin = Badmin ? 'Admin' : 'Not Admin';
    return { first, last, username, admin, coolnessRating };
  }

  const rows = [
    createData('Katherine', 'Wang', 'kat@gmail.com', true, 100),
    createData('Rose', 'Wang', 'rose@gmail.com', false, 0),
  ];

  const ids = [
    ['first', 'string'],
    ['last', 'string'],
    ['username', 'string'],
    ['admin', 'string'],
    ['coolnessRating', 'float'],
  ];

  return (
    <div>
      <PaginationTable rows={rows} ids={ids} />
    </div>
  );
}

export default UserPage;
