import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IOrderHistory } from '../../util/types/order.ts';
import COLORS from '../../assets/colors.ts';

interface HistorySidebarProps {
  history: IOrderHistory[];
}

// Status colors matching the graph - light versions for backgrounds
const statusColors: Record<string, { bg: string; text: string }> = {
  Inquiry: { bg: 'rgba(255, 152, 0, 0.15)', text: '#E65100' },
  Confirmed: { bg: 'rgba(33, 150, 243, 0.15)', text: '#1565C0' },
  'In Production': { bg: 'rgba(156, 39, 176, 0.15)', text: '#7B1FA2' },
  'Ready to Ship': { bg: 'rgba(0, 188, 212, 0.15)', text: '#00838F' },
  Shipped: { bg: 'rgba(76, 175, 80, 0.15)', text: '#2E7D32' },
  Invoiced: { bg: 'rgba(139, 195, 74, 0.15)', text: '#558B2F' },
};

/**
 * Component for displaying order history in the sidebar
 */
function HistorySidebar({ history }: HistorySidebarProps) {
  const getStatusStyle = (status: string) => {
    const colors = statusColors[status] || {
      bg: 'transparent',
      text: 'inherit',
    };
    return {
      backgroundColor: colors.bg,
      color: colors.text,
      px: 1,
      py: 0.5,
      borderRadius: 1,
      display: 'inline-block',
      fontWeight: 600,
      fontSize: '0.75rem',
    };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TableContainer
        component={Paper}
        sx={{
          flexGrow: 1,
          backgroundColor: COLORS.white,
          borderRadius: 2,
          overflow: 'auto',
        }}
      >
        {history.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No history available
            </Typography>
          </Box>
        ) : (
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#800020',
                    color: COLORS.white,
                  }}
                >
                  Order
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#800020',
                    color: COLORS.white,
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#800020',
                    color: COLORS.white,
                  }}
                >
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry) => (
                <TableRow key={entry.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {entry.orderName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={getStatusStyle(entry.status)}>{entry.status}</Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(entry.statusUpdateDate)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}

export default HistorySidebar;
