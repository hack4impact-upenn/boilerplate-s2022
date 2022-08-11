import React from 'react';
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
  }
  function createData(
    remove: boolean,
    first: string,
    last: string,
    username: string,
    admin: boolean,
  ): Data {
    return { remove, first, last, username, admin };
  }

  const rows = [
    createData(false, 'Katherine', 'Wang', 'kat@gmail.com', true),
    createData(false, 'Rose', 'Wang', 'rose@gmail.com', false),
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
