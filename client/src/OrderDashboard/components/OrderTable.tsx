import React, { useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IOrder, OrderFilters } from '../../util/types/order.ts';

interface OrderTableProps {
  orders: IOrder[];
  filters: OrderFilters;
}

/**
 * Component for displaying orders in a table with filtering
 */
function OrderTable({ orders, filters }: OrderTableProps) {
  const columns = [
    { id: 'uuid', label: 'UUID', minWidth: 200 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'name', label: 'Name', minWidth: 150 },
    {
      id: 'amountPaid',
      label: 'Amount Paid',
      minWidth: 120,
      align: 'right' as const,
    },
    { id: 'caramel', label: 'Caramel', minWidth: 80, align: 'center' as const },
    {
      id: 'respresso',
      label: 'Respresso',
      minWidth: 100,
      align: 'center' as const,
    },
    { id: 'butter', label: 'Butter', minWidth: 80, align: 'center' as const },
    { id: 'cheddar', label: 'Cheddar', minWidth: 90, align: 'center' as const },
    { id: 'kettle', label: 'Kettle', minWidth: 80, align: 'center' as const },
    { id: 'status', label: 'Status', minWidth: 120 },
  ];

  // Filter orders based on filters
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Filter by customer (name or email)
    if (filters.customer) {
      const searchTerm = filters.customer.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.name.toLowerCase().includes(searchTerm) ||
          order.email.toLowerCase().includes(searchTerm),
      );
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    // Filter by date range
    if (filters.dateRange?.start && filters.dateRange?.end) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate >= filters.dateRange!.start! &&
          orderDate <= filters.dateRange!.end!
        );
      });
    }

    return filtered;
  }, [orders, filters]);

  // Transform orders to table rows
  interface TableRowData {
    key: string;
    uuid: string;
    email: string;
    name: string;
    amountPaid: string;
    caramel: number;
    respresso: number;
    butter: number;
    cheddar: number;
    kettle: number;
    status: string;
  }

  const rows: TableRowData[] = filteredOrders.map((order) => ({
    key: order.uuid,
    uuid: order.uuid,
    email: order.email,
    name: order.name,
    amountPaid: `$${order.amountPaid.toFixed(2)}`,
    caramel: order.popcornQuantities.caramel,
    respresso: order.popcornQuantities.respresso,
    butter: order.popcornQuantities.butter,
    cheddar: order.popcornQuantities.cheddar,
    kettle: order.popcornQuantities.kettle,
    status: order.status,
  }));

  // Limit to 6 rows max
  const displayRows = rows.slice(0, 6);

  return (
    <TableContainer component={Paper} sx={{ width: '100%', pb: '2rem' }}>
      <Table stickyHeader aria-label="orders table" size="small">
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
          {displayRows.map((row) => (
            <TableRow hover key={row.key}>
              {columns.map((column) => {
                const value = row[column.id as keyof TableRowData];
                return (
                  <TableCell key={column.id} align={column.align || 'left'}>
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
