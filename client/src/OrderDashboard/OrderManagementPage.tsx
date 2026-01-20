import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  CircularProgress,
  Alert,
  Autocomplete,
} from '@mui/material';
import DashboardHeader from './components/DashboardHeader.tsx';
import COLORS from '../assets/colors.ts';
import { fetchOrderById, updateOrder, fetchOrders } from './api.tsx';
import { OrderStatus } from '../util/types/order.ts';
import useAlert from '../util/hooks/useAlert.tsx';
import AlertType from '../util/types/alert.ts';
import PrimaryButton from '../components/buttons/PrimaryButton.tsx';

/**
 * Extended order interface to include all fields from backend
 */
interface ExtendedOrder {
  orderId: string;
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  company: string;
  discountCode: string;
  discountPrice: number;
  amountPaid: number;
  status: OrderStatus;
  popcornQuantities: {
    caramel: number;
    respresso: number;
    butter: number;
    cheddar: number;
    kettle: number;
  };
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Order Management Page - allows selecting and editing orders
 */
function OrderManagementPage() {
  const { setAlert } = useAlert();
  const [searchValue, setSearchValue] = useState<string>('');
  const [orderOptions, setOrderOptions] = useState<
    Array<{ id: string; label: string }>
  >([]);
  const [selectedOption, setSelectedOption] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<ExtendedOrder | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load order options for autocomplete
  React.useEffect(() => {
    const loadOrderOptions = async () => {
      try {
        const response = await fetchOrders();
        if (response.data && Array.isArray(response.data)) {
          const options = response.data.map(
            (order: { uuid?: string; orderId?: string; name?: string }) => ({
              id: order.uuid || order.orderId || '',
              label: `${order.name || 'Unknown'} (${
                order.uuid || order.orderId || 'N/A'
              })`,
            }),
          );
          setOrderOptions(options);
        }
      } catch (err) {
        // Silently handle error - options will remain empty
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };
    loadOrderOptions();
  }, []);

  const handleSearch = async () => {
    // Use the selected option's ID if available, otherwise use the search value
    const searchId = selectedOption?.id || searchValue.trim();

    if (!searchId) {
      setError('Please enter an order ID or name');
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedOrder(null);

    try {
      const response = await fetchOrderById(searchId);
      if (response.error) {
        setError(response.error.message || 'Order not found');
      } else if (response.data) {
        setSelectedOrder(response.data as ExtendedOrder);
        setError(null);
      } else {
        setError('Order not found');
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch order';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (
    field: string,
    value: string | number | OrderStatus,
  ) => {
    if (!selectedOrder) return;

    if (field.startsWith('popcornQuantities.')) {
      const subField = field.split('.')[1];
      setSelectedOrder({
        ...selectedOrder,
        popcornQuantities: {
          ...selectedOrder.popcornQuantities,
          [subField]: value,
        },
      });
    } else {
      setSelectedOrder({
        ...selectedOrder,
        [field]: value,
      });
    }
  };

  const handleSave = async () => {
    if (!selectedOrder) return;

    setSaving(true);
    setError(null);

    try {
      const orderId = selectedOrder.orderId || selectedOrder.uuid;
      const response = await updateOrder(orderId, selectedOrder);

      if (response.error) {
        setError(response.error.message || 'Failed to update order');
        setAlert('Failed to update order', AlertType.ERROR);
      } else {
        setAlert('Order updated successfully', AlertType.SUCCESS);
        // Reload the order to get the latest data
        const reloadResponse = await fetchOrderById(orderId);
        if (reloadResponse.data) {
          setSelectedOrder(reloadResponse.data as ExtendedOrder);
        }
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update order';
      setError(errorMessage);
      setAlert('Failed to update order', AlertType.ERROR);
    } finally {
      setSaving(false);
    }
  };

  const statusOptions: OrderStatus[] = [
    'Inquiry',
    'Confirmed',
    'In Production',
    'Ready to Ship',
    'Shipped',
    'Invoiced',
  ];

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
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 3,
        }}
      >
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
                  Search Order
                </Typography>
              </Box>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Autocomplete
                    freeSolo
                    options={orderOptions}
                    value={selectedOption}
                    onChange={(_, newValue) => {
                      if (
                        newValue &&
                        typeof newValue === 'object' &&
                        'id' in newValue
                      ) {
                        setSelectedOption(newValue);
                        setSearchValue(newValue.label);
                      } else {
                        setSelectedOption(null);
                      }
                    }}
                    getOptionLabel={(option) =>
                      typeof option === 'string' ? option : option.label
                    }
                    inputValue={searchValue}
                    onInputChange={(_, newValue) => {
                      setSearchValue(newValue);
                      // Clear selected option if user is typing manually
                      if (newValue !== selectedOption?.label) {
                        setSelectedOption(null);
                      }
                    }}
                    renderInput={(params) => {
                      const {
                        InputLabelProps,
                        InputProps,
                        id,
                        inputRef,
                      } = params;
                      const combinedInputProps = {
                        ...InputProps,
                        inputProps: params.inputProps,
                      };
                      return (
                        <TextField
                          id={id}
                          inputRef={inputRef}
                          InputLabelProps={InputLabelProps}
                          InputProps={combinedInputProps}
                          label="Order ID or Name"
                          placeholder="Enter order ID (UUID) or customer name"
                          fullWidth
                          size="small"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleSearch();
                            }
                          }}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={loading || !searchValue.trim()}
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

            {/* Order Form */}
            {selectedOrder && (
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: COLORS.white,
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#800020',
                    color: COLORS.white,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 1,
                    mb: 3,
                    display: 'inline-block',
                    width: 'fit-content',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Edit Order
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  {/* Basic Information */}
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        pb: 1,
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Basic Information
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Order ID"
                          value={selectedOrder.orderId || ''}
                          disabled
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="UUID"
                          value={selectedOrder.uuid || ''}
                          disabled
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="First Name"
                          value={selectedOrder.firstName || ''}
                          onChange={(e) =>
                            handleFieldChange('firstName', e.target.value)
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          value={selectedOrder.lastName || ''}
                          onChange={(e) =>
                            handleFieldChange('lastName', e.target.value)
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={selectedOrder.name || ''}
                          onChange={(e) =>
                            handleFieldChange('name', e.target.value)
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          value={selectedOrder.email || ''}
                          onChange={(e) =>
                            handleFieldChange('email', e.target.value)
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={selectedOrder.phoneNumber || ''}
                          onChange={(e) =>
                            handleFieldChange('phoneNumber', e.target.value)
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Company"
                          value={selectedOrder.company || ''}
                          onChange={(e) =>
                            handleFieldChange('company', e.target.value)
                          }
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Status and Financial Information */}
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        pb: 1,
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Status & Financial Information
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          fullWidth
                          select
                          label="Status"
                          value={selectedOrder.status || 'Inquiry'}
                          onChange={(e) =>
                            handleFieldChange(
                              'status',
                              e.target.value as OrderStatus,
                            )
                          }
                          size="small"
                        >
                          {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          fullWidth
                          label="Amount Paid"
                          type="number"
                          value={selectedOrder.amountPaid || 0}
                          onChange={(e) =>
                            handleFieldChange(
                              'amountPaid',
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          size="small"
                          inputProps={{ step: '0.01', min: 0 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          fullWidth
                          label="Discount Code"
                          value={selectedOrder.discountCode || ''}
                          onChange={(e) =>
                            handleFieldChange('discountCode', e.target.value)
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          fullWidth
                          label="Discount Price"
                          type="number"
                          value={selectedOrder.discountPrice || 0}
                          onChange={(e) =>
                            handleFieldChange(
                              'discountPrice',
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          size="small"
                          inputProps={{ step: '0.01', min: 0 }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Popcorn Quantities */}
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        pb: 1,
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Popcorn Quantities
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <TextField
                          fullWidth
                          label="Caramel"
                          type="number"
                          value={selectedOrder.popcornQuantities?.caramel || 0}
                          onChange={(e) =>
                            handleFieldChange(
                              'popcornQuantities.caramel',
                              parseInt(e.target.value, 10) || 0,
                            )
                          }
                          size="small"
                          inputProps={{ min: 0 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <TextField
                          fullWidth
                          label="Respresso"
                          type="number"
                          value={
                            selectedOrder.popcornQuantities?.respresso || 0
                          }
                          onChange={(e) =>
                            handleFieldChange(
                              'popcornQuantities.respresso',
                              parseInt(e.target.value, 10) || 0,
                            )
                          }
                          size="small"
                          inputProps={{ min: 0 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <TextField
                          fullWidth
                          label="Butter"
                          type="number"
                          value={selectedOrder.popcornQuantities?.butter || 0}
                          onChange={(e) =>
                            handleFieldChange(
                              'popcornQuantities.butter',
                              parseInt(e.target.value, 10) || 0,
                            )
                          }
                          size="small"
                          inputProps={{ min: 0 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <TextField
                          fullWidth
                          label="Cheddar"
                          type="number"
                          value={selectedOrder.popcornQuantities?.cheddar || 0}
                          onChange={(e) =>
                            handleFieldChange(
                              'popcornQuantities.cheddar',
                              parseInt(e.target.value, 10) || 0,
                            )
                          }
                          size="small"
                          inputProps={{ min: 0 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={2.4}>
                        <TextField
                          fullWidth
                          label="Kettle"
                          type="number"
                          value={selectedOrder.popcornQuantities?.kettle || 0}
                          onChange={(e) =>
                            handleFieldChange(
                              'popcornQuantities.kettle',
                              parseInt(e.target.value, 10) || 0,
                            )
                          }
                          size="small"
                          inputProps={{ min: 0 }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Timestamps */}
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        pb: 1,
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Timestamps
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Submitted At"
                          value={
                            selectedOrder.submittedAt
                              ? new Date(
                                  selectedOrder.submittedAt,
                                ).toLocaleString()
                              : 'N/A'
                          }
                          disabled
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Created At"
                          value={
                            selectedOrder.createdAt
                              ? new Date(
                                  selectedOrder.createdAt,
                                ).toLocaleString()
                              : 'N/A'
                          }
                          disabled
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Updated At"
                          value={
                            selectedOrder.updatedAt
                              ? new Date(
                                  selectedOrder.updatedAt,
                                ).toLocaleString()
                              : 'N/A'
                          }
                          disabled
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Save Button */}
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <PrimaryButton
                        onClick={handleSave}
                        disabled={saving}
                        sx={{ minWidth: '150px' }}
                      >
                        {saving ? (
                          <CircularProgress size={24} />
                        ) : (
                          'Save Changes'
                        )}
                      </PrimaryButton>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            )}

            {!selectedOrder && !loading && (
              <Paper
                sx={{
                  p: 4,
                  backgroundColor: COLORS.white,
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Search for an order by ID or name to begin editing
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default OrderManagementPage;

