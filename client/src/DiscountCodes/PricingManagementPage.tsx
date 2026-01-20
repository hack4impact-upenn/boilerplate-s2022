import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DashboardHeader from '../OrderDashboard/components/DashboardHeader.tsx';
import COLORS from '../assets/colors.ts';
import {
  fetchDiscountCodes,
  createDiscountCode,
  updateDiscountCode,
  deleteDiscountCode,
  fetchPopcornPrices,
  updatePopcornPrices,
} from './api.tsx';
import useAlert from '../util/hooks/useAlert.tsx';
import AlertType from '../util/types/alert.ts';
import PrimaryButton from '../components/buttons/PrimaryButton.tsx';

interface DiscountCode {
  id: string;
  code: string;
  email: string;
  price: number;
  popcornPrices?: PopcornPrices;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PopcornPrices {
  id?: string;
  caramel: number;
  respresso: number;
  butter: number;
  cheddar: number;
  kettle: number;
}

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

/**
 * Pricing Management Page - allows managing popcorn prices and discount codes
 */
function PricingManagementPage() {
  const { setAlert } = useAlert();
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [popcornPrices, setPopcornPrices] = useState<PopcornPrices>({
    caramel: 5.75,
    respresso: 5.75,
    butter: 5.75,
    cheddar: 5.75,
    kettle: 5.75,
  });
  const [loading, setLoading] = useState(true);
  const [savingPrices, setSavingPrices] = useState(false);
  const [savingCode, setSavingCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [codeToDelete, setCodeToDelete] = useState<string | null>(null);

  // Dialog state for discount codes
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<DiscountCode | null>(null);
  const [useSamePrice, setUseSamePrice] = useState(true);
  const [codeForm, setCodeForm] = useState({
    code: '',
    email: '',
    price: 5.75,
    popcornPrices: {
      caramel: 5.75,
      respresso: 5.75,
      butter: 5.75,
      cheddar: 5.75,
      kettle: 5.75,
    },
    description: '',
    isActive: true,
  });

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [codesResponse, pricesResponse] = await Promise.all([
        fetchDiscountCodes(),
        fetchPopcornPrices(),
      ]);

      if (codesResponse.error) {
        setError(
          codesResponse.error.message || 'Failed to load discount codes',
        );
      } else if (codesResponse.data) {
        // Map _id to id for consistency
        const mappedCodes = codesResponse.data.map(
          (code: { [key: string]: unknown }) => {
            // eslint-disable-next-line no-underscore-dangle
            const codeId = code._id as string;
            return {
              ...code,
              id: codeId,
            };
          },
        );
        setDiscountCodes(mappedCodes);
      }

      if (pricesResponse.error) {
        setError(
          pricesResponse.error.message || 'Failed to load popcorn prices',
        );
      } else if (pricesResponse.data) {
        setPopcornPrices(pricesResponse.data);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const handlePriceChange = (field: keyof PopcornPrices, value: number) => {
    setPopcornPrices({
      ...popcornPrices,
      [field]: value,
    });
  };

  const handleSavePrices = async () => {
    setSavingPrices(true);
    setError(null);
    try {
      const response = await updatePopcornPrices(popcornPrices);
      if (response.error) {
        setError(response.error.message || 'Failed to update prices');
        setAlert('Failed to update popcorn prices', AlertType.ERROR);
      } else {
        setAlert('Popcorn prices updated successfully', AlertType.SUCCESS);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update prices';
      setError(errorMessage);
      setAlert('Failed to update popcorn prices', AlertType.ERROR);
    } finally {
      setSavingPrices(false);
    }
  };

  const handleOpenDialog = (code?: DiscountCode) => {
    if (code) {
      setEditingCode(code);
      const defaultPrices = {
        caramel: 5.75,
        respresso: 5.75,
        butter: 5.75,
        cheddar: 5.75,
        kettle: 5.75,
      };
      setCodeForm({
        code: code.code,
        email: code.email || '',
        price: code.price,
        popcornPrices: code.popcornPrices || defaultPrices,
        description: code.description,
        isActive: code.isActive,
      });
      // Check if all prices are the same
      if (code.popcornPrices) {
        const prices = Object.values(code.popcornPrices);
        setUseSamePrice(prices.every((p) => p === prices[0]));
      } else {
        setUseSamePrice(true);
      }
    } else {
      setEditingCode(null);
      setCodeForm({
        code: '',
        email: '',
        price: 5.75,
        popcornPrices: {
          caramel: 5.75,
          respresso: 5.75,
          butter: 5.75,
          cheddar: 5.75,
          kettle: 5.75,
        },
        description: '',
        isActive: true,
      });
      setUseSamePrice(true);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingCode(null);
    setCodeForm({
      code: '',
      email: '',
      price: 5.75,
      popcornPrices: {
        caramel: 5.75,
        respresso: 5.75,
        butter: 5.75,
        cheddar: 5.75,
        kettle: 5.75,
      },
      description: '',
      isActive: true,
    });
    setUseSamePrice(true);
  };

  const handleSaveCode = async () => {
    // Validate prices
    if (codeForm.price < 0) {
      setAlert('Price must be >= 0', AlertType.ERROR);
      return;
    }
    if (codeForm.popcornPrices) {
      const prices = Object.values(codeForm.popcornPrices);
      if (prices.some((p) => p < 0)) {
        setAlert('All flavor prices must be >= 0', AlertType.ERROR);
        return;
      }
    }

    setSavingCode(true);
    setError(null);
    try {
      // Prepare data: if useSamePrice, send price; otherwise send popcornPrices
      const dataToSend: {
        code?: string;
        email?: string;
        price?: number;
        popcornPrices?: {
          caramel: number;
          respresso: number;
          butter: number;
          cheddar: number;
          kettle: number;
        };
        description: string;
        isActive: boolean;
      } = {
        code: codeForm.code || undefined,
        email: codeForm.email,
        description: codeForm.description,
        isActive: codeForm.isActive,
      };

      if (useSamePrice) {
        dataToSend.price = codeForm.price;
      } else {
        dataToSend.popcornPrices = codeForm.popcornPrices;
      }

      let response;
      if (editingCode) {
        response = await updateDiscountCode(editingCode.id, dataToSend);
      } else {
        response = await createDiscountCode(dataToSend);
      }

      if (response.error) {
        setError(response.error.message || 'Failed to save discount code');
        setAlert('Failed to save discount code', AlertType.ERROR);
      } else {
        const successMessage = editingCode
          ? 'Discount code updated successfully'
          : 'Discount code created successfully';
        setAlert(successMessage, AlertType.SUCCESS);
        handleCloseDialog();
        loadData();
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to save discount code';
      setError(errorMessage);
      setAlert('Failed to save discount code', AlertType.ERROR);
    } finally {
      setSavingCode(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setCodeToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!codeToDelete) return;

    setError(null);
    try {
      const response = await deleteDiscountCode(codeToDelete);
      if (response.error) {
        setError(response.error.message || 'Failed to delete discount code');
        setAlert('Failed to delete discount code', AlertType.ERROR);
      } else {
        setAlert('Discount code deleted successfully', AlertType.SUCCESS);
        loadData();
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete discount code';
      setError(errorMessage);
      setAlert('Failed to delete discount code', AlertType.ERROR);
    } finally {
      setDeleteConfirmOpen(false);
      setCodeToDelete(null);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: COLORS.primaryRed,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12} lg={10} xl={8}>
            {/* Popcorn Prices Section */}
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
                  mb: 3,
                  display: 'inline-block',
                  width: 'fit-content',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Popcorn Prices
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Caramel Price"
                    type="number"
                    value={popcornPrices.caramel}
                    onChange={(e) =>
                      handlePriceChange(
                        'caramel',
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    size="small"
                    inputProps={{ step: '0.01', min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Respresso Price"
                    type="number"
                    value={popcornPrices.respresso}
                    onChange={(e) =>
                      handlePriceChange(
                        'respresso',
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    size="small"
                    inputProps={{ step: '0.01', min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Butter Price"
                    type="number"
                    value={popcornPrices.butter}
                    onChange={(e) =>
                      handlePriceChange(
                        'butter',
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    size="small"
                    inputProps={{ step: '0.01', min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Cheddar Price"
                    type="number"
                    value={popcornPrices.cheddar}
                    onChange={(e) =>
                      handlePriceChange(
                        'cheddar',
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    size="small"
                    inputProps={{ step: '0.01', min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Kettle Price"
                    type="number"
                    value={popcornPrices.kettle}
                    onChange={(e) =>
                      handlePriceChange(
                        'kettle',
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    size="small"
                    inputProps={{ step: '0.01', min: 0 }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <PrimaryButton
                  onClick={handleSavePrices}
                  disabled={savingPrices}
                  sx={{ minWidth: '150px' }}
                >
                  {savingPrices ? (
                    <CircularProgress size={24} />
                  ) : (
                    'Save Prices'
                  )}
                </PrimaryButton>
              </Box>
            </Paper>

            {/* Discount Codes Section */}
            <Paper
              sx={{
                p: 3,
                backgroundColor: COLORS.white,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
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
                    display: 'inline-block',
                    width: 'fit-content',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Discount Codes
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog()}
                  sx={{
                    backgroundColor: '#800020',
                    '&:hover': { backgroundColor: '#600015' },
                  }}
                >
                  Add Discount Code
                </Button>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Code (UUID)</TableCell>
                      <TableCell>Eligible Email</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {discountCodes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography variant="body2" color="text.secondary">
                            No discount codes found. Click &quot;Add Discount
                            Code&quot; to create one.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      discountCodes.map((code) => (
                        <TableRow key={code.id}>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{ fontFamily: 'monospace' }}
                            >
                              {code.code}
                            </Typography>
                          </TableCell>
                          <TableCell>{code.email || '-'}</TableCell>
                          <TableCell>
                            {code.popcornPrices ? (
                              <Box>
                                <Typography variant="body2">
                                  Caramel: {formatCurrency(code.popcornPrices.caramel)}
                                </Typography>
                                <Typography variant="body2">
                                  Respresso: {formatCurrency(code.popcornPrices.respresso)}
                                </Typography>
                                <Typography variant="body2">
                                  Butter: {formatCurrency(code.popcornPrices.butter)}
                                </Typography>
                                <Typography variant="body2">
                                  Cheddar: {formatCurrency(code.popcornPrices.cheddar)}
                                </Typography>
                                <Typography variant="body2">
                                  Kettle: {formatCurrency(code.popcornPrices.kettle)}
                                </Typography>
                              </Box>
                            ) : (
                              `$${code.price.toFixed(2)} (all flavors)`
                            )}
                          </TableCell>
                          <TableCell>{code.description || '-'}</TableCell>
                          <TableCell>
                            {code.isActive ? (
                              <Typography variant="body2" color="success.main">
                                Active
                              </Typography>
                            ) : (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Inactive
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenDialog(code)}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteClick(code.id)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Discount Code Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingCode ? 'Edit Discount Code' : 'Create Discount Code'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Code (UUID)"
                value={codeForm.code}
                onChange={(e) =>
                  setCodeForm({ ...codeForm, code: e.target.value })
                }
                size="small"
                helperText="Leave empty to auto-generate a UUID"
                placeholder="Auto-generated if left empty"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Eligible Email (optional)"
                type="email"
                value={codeForm.email}
                onChange={(e) =>
                  setCodeForm({ ...codeForm, email: e.target.value })
                }
                size="small"
                helperText="Only orders from this email can use the link"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={useSamePrice}
                    onChange={(e) => {
                      const newUseSamePrice = e.target.checked;
                      setUseSamePrice(newUseSamePrice);
                      if (newUseSamePrice) {
                        // Set all flavors to the same price
                        setCodeForm({
                          ...codeForm,
                          popcornPrices: {
                            caramel: codeForm.price,
                            respresso: codeForm.price,
                            butter: codeForm.price,
                            cheddar: codeForm.price,
                            kettle: codeForm.price,
                          },
                        });
                      }
                    }}
                  />
                }
                label="Use same price for all flavors"
              />
            </Grid>

            {useSamePrice ? (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price (applies to all flavors)"
                  type="number"
                  value={codeForm.price}
                  onChange={(e) => {
                    const newPrice = parseFloat(e.target.value) || 0;
                    setCodeForm({
                      ...codeForm,
                      price: newPrice,
                      popcornPrices: {
                        caramel: newPrice,
                        respresso: newPrice,
                        butter: newPrice,
                        cheddar: newPrice,
                        kettle: newPrice,
                      },
                    });
                  }}
                  size="small"
                  inputProps={{ step: '0.01', min: 0 }}
                  required
                />
              </Grid>
            ) : (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Individual Flavor Prices
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Caramel"
                    type="number"
                    value={codeForm.popcornPrices.caramel}
                    onChange={(e) =>
                      setCodeForm({
                        ...codeForm,
                        popcornPrices: {
                          ...codeForm.popcornPrices,
                          caramel: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    size="small"
                    inputProps={{ step: '0.01', min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Respresso"
                    type="number"
                    value={codeForm.popcornPrices.respresso}
                    onChange={(e) =>
                      setCodeForm({
                        ...codeForm,
                        popcornPrices: {
                          ...codeForm.popcornPrices,
                          respresso: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    size="small"
                    inputProps={{ step: '0.01', min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Butter"
                    type="number"
                    value={codeForm.popcornPrices.butter}
                    onChange={(e) =>
                      setCodeForm({
                        ...codeForm,
                        popcornPrices: {
                          ...codeForm.popcornPrices,
                          butter: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    size="small"
                    inputProps={{ step: '0.01', min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cheddar"
                    type="number"
                    value={codeForm.popcornPrices.cheddar}
                    onChange={(e) =>
                      setCodeForm({
                        ...codeForm,
                        popcornPrices: {
                          ...codeForm.popcornPrices,
                          cheddar: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    size="small"
                    inputProps={{ step: '0.01', min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Kettle"
                    type="number"
                    value={codeForm.popcornPrices.kettle}
                    onChange={(e) =>
                      setCodeForm({
                        ...codeForm,
                        popcornPrices: {
                          ...codeForm.popcornPrices,
                          kettle: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    size="small"
                    inputProps={{ step: '0.01', min: 0 }}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={codeForm.description}
                onChange={(e) =>
                  setCodeForm({
                    ...codeForm,
                    description: e.target.value,
                  })
                }
                size="small"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={codeForm.isActive}
                    onChange={(e) =>
                      setCodeForm({ ...codeForm, isActive: e.target.checked })
                    }
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <PrimaryButton onClick={handleSaveCode} disabled={savingCode}>
            {(() => {
              if (savingCode) {
                return <CircularProgress size={24} />;
              }
              return editingCode ? 'Update' : 'Create';
            })()}
          </PrimaryButton>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setCodeToDelete(null);
        }}
      >
        <DialogTitle>Delete Discount Code</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this discount code? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteConfirmOpen(false);
              setCodeToDelete(null);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PricingManagementPage;

