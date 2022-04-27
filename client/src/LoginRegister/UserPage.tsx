import React, { useState } from 'react';
import { PaginationTable } from '../components/StyledComponents';
/**
 * We use the pagination table component to load a paginated user table after denoting the
 * column names and data types through ids, Data, and createData. rows is the data that we
 * load into the custom component.
 * @returns a page containing a paginated user table
 */
function UserPage() {
  interface Data {
    remove: boolean;
    first: string;
    last: string;
    username: string;
    admin: boolean;
    coolnessRating: number;
  }
  function createData(
    remove: boolean,
    first: string,
    last: string,
    username: string,
    admin: boolean,
    coolnessRating: number,
  ): Data {
    return { remove, first, last, username, admin, coolnessRating };
  }

  const rows = [
    createData(false, 'Katherine', 'Wang', 'kat@gmail.com', true, 100),
    createData(false, 'Rose', 'Wang', 'rose@gmail.com', false, 0),
  ];

  const ids = [
    ['remove', 'boolean'],
    ['first', 'string'],
    ['last', 'string'],
    ['username', 'string'],
    ['admin', 'boolean'],
    ['coolnessRating', 'float'],
  ];

  return (
    <div>
      <PaginationTable rows={rows} ids={ids} />
    </div>
  );
}

export default UserPage;
