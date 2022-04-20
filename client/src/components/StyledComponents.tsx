import { styled } from '@mui/system';
import React from 'react';
import {
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

interface StyledProps {
  children: React.ReactNode;
}

interface TableProps {
  rows: any[];
  ids: any[];
}

/**
 * This is for the little baby links on the bottom of the form
 * (i.e. forgot password, signup, etc.) We style the sizing.
 * @param param0
 * @returns
 */
const MiniLinkTextStyled = styled(Typography)(() => ({
  fontSize: '0.75em',
}));

function MiniLinkText({ children }: StyledProps) {
  return <MiniLinkTextStyled noWrap={false}>{children}</MiniLinkTextStyled>;
}

/**
 * This styles the form's header to just have a larger font size
 * @param param0
 * @returns
 */
const FormHeaderText = styled(Typography)({
  fontSize: '1.2em',
});

/**
 * This styles a the whole screen as a grid component, serves as a wrapper to ensure
 * that we know what role it plays, as well as height as the whole screen, spacing, and resizing
 * @param param0
 * @returns
 */
function ScreenGrid({ children }: StyledProps) {
  return (
    <Grid
      container
      justifyContent="center"
      height="100vh"
      flexDirection="column"
      alignItems="center"
    >
      {children}
    </Grid>
  );
}

/**
 * This styles a form's components if we want them in a column, serves as a wrapper to ensure
 * that we know what role it plays in the larger grid, as well as width, spacing, and resizing
 * @param param0
 * @returns
 */
function FormGridCol({ children }: StyledProps) {
  return (
    <Grid
      container
      justifyContent="center"
      spacing={1.5}
      flexDirection="column"
      alignItems="center"
    >
      {children}
    </Grid>
  );
}

/**
 * This styles a form's components if we want them in a row, serves as a wrapper to ensure
 * that we know what role it plays in the larger grid, as well as width, spacing, and resizing
 * @param param0
 * @returns
 */
function FormGridRow({ children }: StyledProps) {
  return (
    <Grid
      item
      container
      xs="auto"
      justifyContent="space-evenly"
      rowSpacing={0}
      columnSpacing={4}
      alignItems="flex-end"
      flexDirection="row"
    >
      {children}
    </Grid>
  );
}

/**
 * This just styles a child in the form, serves as a wrapper to ensure
 * that we know what role it plays in the larger grid, as well as width and resizing
 * @param param0
 * @returns
 */
function FormField({ children }: StyledProps) {
  return (
    <Grid item xs="auto">
      {children}
    </Grid>
  );
}

/**
 * This is our pagination component, mainly used in tables that require
 * multiple pages, for example the user tables in admin-view.
 */
function PaginationTable({ rows, ids }: TableProps) {
  interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: Column[] = [];
  ids.forEach((i) => {
    const [id, type] = i;
    columns.push({
      id,
      label: id.charAt(0).toUpperCase() + id.slice(1),
      minWidth: 170,
      align: 'right',
      format: (value: number) =>
        // eslint-disable-next-line no-nested-ternary
        type === 'int'
          ? value.toLocaleString('en-US')
          : type === 'float'
          ? value.toFixed(2)
          : '',
    });
  });

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
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
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
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.username}
                    >
                      {columns.map((column) => {
                        console.log(`THIS IS THE COLUMN ID:${column.id}`);
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
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
    </div>
  );
}

export {
  MiniLinkText,
  FormHeaderText,
  ScreenGrid,
  FormGridCol,
  FormGridRow,
  FormField,
  PaginationTable,
};
