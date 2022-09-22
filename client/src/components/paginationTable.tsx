import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

interface TableProps {
  rows: TRow[];
  columns: TColumn[];
}

interface RowProps {
  row: TRow;
  columns: TColumn[];
}

/**
 * This column interface defines the properties necessary for each column in a table.
 * The minWidth, align, and format are specific to the MUI Table component.
 */
interface TColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right';
  format?: (value: number) => string;
}

// must have a key param
interface TRow {
  key: string;
  [key: string]: any;
}

/**
 * Our pagination table is set up by passing in a row component for each row.
 * This is the row component for a table of users. Most notably, its columns include
 * an admin field which is a switch that can be toggled, and user deletion capabilities.
 * @param row, columns
 * @returns User Row component, to be used in a user-specific pagination table.
 */
function Row({ row, columns }: RowProps) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={`${row.key}TR`}>
      {columns.map((column) => {
        const value = row[column.id];
        if (value === null || value === undefined) {
          return null;
        }
        return (
          <TableCell key={column.id + row.key} align={column.align || 'left'}>
            {value}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

/**
 * This is our pagination component, mainly used in tables that require
 * multiple pages, for example the user tables in admin-view.
 */
function PaginationTable({ rows, columns }: TableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box bgcolor="red">
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'grey',
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return <Row row={row} key={row.key} columns={columns} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export { PaginationTable };
export type { TRow, TColumn };
