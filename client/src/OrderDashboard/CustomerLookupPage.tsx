import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Chip,
} from '@mui/material';
import DashboardHeader from './components/DashboardHeader.tsx';
import COLORS from '../assets/colors.ts';
import { searchOrdersByCustomer } from './api.tsx';

interface OrderSummary {
  orderId: string;
  uuid: string;
  email: string;
  name: string;
  status: string;
  statusDates: {
    inquiry: string | null;
    confirmed: string | null;
    inProduction: string | null;
    readyToShip: string | null;
    shipped: string | null;
    invoiced: string | null;
  };
  discountCode: string;
  amountPaid: number;
  submittedAt: string | null;
}

interface DiscountCodeSummary {
  id: string;
  code: string;
  email: string;
  description: string;
  isActive: boolean;
  price: number;
}

interface SearchResponse {
  query: string;
  matchedEmails: string[];
  orders: OrderSummary[];
  discountCodes: DiscountCodeSummary[];
  usedCodes: string[];
}

function CustomerLookupPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResponse | null>(null);

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Enter an email or name to search.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await searchOrdersByCustomer(trimmed);
      if (response.error) {
        setError(response.error.message || 'Search failed.');
      } else {
        setResult(response.data as SearchResponse);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Search failed.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: COLORS.primaryRed,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DashboardHeader />
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={10} xl={8}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: COLORS.white,
                borderRadius: 2,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#800020',
                  color: COLORS.white,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1,
                  mb: 2,
                  display: 'inline-block',
                  width: 'fit-content',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Customer Lookup
                </Typography>
              </Box>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <TextField
                    label="Email or Name"
                    placeholder="Search by email or customer name"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    fullWidth
                    size="small"
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={loading || !query.trim()}
                    fullWidth
                    sx={{ height: '40px' }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Search'}
                  </Button>
                </Grid>
              </Grid>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </Paper>

            {result && (
              <>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: COLORS.white,
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Associated Codes
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}
                  >
                    {result.usedCodes.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        No discount codes used in orders yet.
                      </Typography>
                    ) : (
                      result.usedCodes.map((code) => (
                        <Chip key={code} label={code} size="small" />
                      ))
                    )}
                  </Box>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Code</TableCell>
                          <TableCell>Email Lock</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {result.discountCodes.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5}>
                              <Typography variant="body2" color="text.secondary">
                                No email-specific codes found.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          result.discountCodes.map((code) => (
                            <TableRow key={code.id}>
                              <TableCell>{code.code}</TableCell>
                              <TableCell>{code.email || '-'}</TableCell>
                              <TableCell>{code.description || '-'}</TableCell>
                              <TableCell>
                                {code.isActive ? 'Active' : 'Inactive'}
                              </TableCell>
                              <TableCell>${code.price.toFixed(2)}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>

                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: COLORS.white,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Past Orders
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Order</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Submitted</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Discount Code</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {result.orders.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6}>
                              <Typography variant="body2" color="text.secondary">
                                No orders found for this search.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          result.orders.map((order) => (
                            <TableRow key={order.uuid || order.orderId}>
                              <TableCell>
                                {order.name || order.orderId}
                              </TableCell>
                              <TableCell>{order.email}</TableCell>
                              <TableCell>{order.status}</TableCell>
                              <TableCell>
                                {order.submittedAt
                                  ? new Date(
                                      order.submittedAt,
                                    ).toLocaleDateString()
                                  : 'N/A'}
                              </TableCell>
                              <TableCell>
                                ${order.amountPaid.toFixed(2)}
                              </TableCell>
                              <TableCell>{order.discountCode || '-'}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </>
            )}

            {!result && !loading && (
              <Paper
                sx={{
                  p: 4,
                  backgroundColor: COLORS.white,
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Search by email or name to view customer order history.
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CustomerLookupPage;

