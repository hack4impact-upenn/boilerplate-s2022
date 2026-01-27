import React from 'react';
import {
  TextField,
  MenuItem,
  Box,
  Grid,
  InputLabel,
  Select,
  FormControl,
} from '@mui/material';
import { OrderFilters, OrderStatus } from '../../util/types/order.ts';

interface OrderFiltersProps {
  filters: OrderFilters;
  onFiltersChange: (filters: OrderFilters) => void;
}

const ORDER_STATUSES: OrderStatus[] = [
  'Inquiry',
  'Confirmed',
  'In Production',
  'Ready to Ship',
  'Shipped',
  'Invoiced',
];

/**
 * Component for filtering orders
 */
function OrderFiltersComponent({
  filters,
  onFiltersChange,
}: OrderFiltersProps) {
  const handleCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      customer: event.target.value,
    });
  };

  const handleStatusChange = (event: any) => {
    onFiltersChange({
      ...filters,
      status: event.target.value as OrderStatus | '',
    });
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        start: event.target.value ? new Date(event.target.value) : null,
      },
    });
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        end: event.target.value ? new Date(event.target.value) : null,
      },
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Filter by Customer"
            placeholder="Name or email"
            value={filters.customer || ''}
            onChange={handleCustomerChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status || ''}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="">All</MenuItem>
              {ORDER_STATUSES.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            value={
              filters.dateRange?.start
                ? filters.dateRange.start.toISOString().split('T')[0]
                : ''
            }
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <TextField
            fullWidth
            label="End Date"
            type="date"
            value={
              filters.dateRange?.end
                ? filters.dateRange.end.toISOString().split('T')[0]
                : ''
            }
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderFiltersComponent;
