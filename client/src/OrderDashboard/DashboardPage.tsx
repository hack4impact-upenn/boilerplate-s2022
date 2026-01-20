import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import DashboardHeader from './components/DashboardHeader.tsx';
import OrderTable from './components/OrderTable.tsx';
import OrderFiltersComponent from './components/OrderFilters.tsx';
import CoolGraphs from './components/CoolGraphs.tsx';
import HistorySidebar from './components/HistorySidebar.tsx';
import {
  IOrder,
  IOrderHistory,
  OrderFilters,
  OrderStatus,
} from '../util/types/order.ts';
import { fetchOrders, fetchOrderHistory, syncTypeformOrders } from './api.tsx';
import COLORS from '../assets/colors.ts';

// Typeform form ID - update this or move to environment variable
const TYPEFORM_FORM_ID = process.env.REACT_APP_TYPEFORM_FORM_ID || 'X3HYI3Te';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  if (value !== index) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`order-tabpanel-${index}`}
      aria-labelledby={`order-tab-${index}`}
    >
      {children}
    </div>
  );
}

/**
 * Main dashboard page component
 */
function DashboardPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [history, setHistory] = useState<IOrderHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<OrderFilters>({});
  const [currentTab, setCurrentTab] = useState(0);

  // Map statusDates keys to OrderStatus values (used by loadData)
  const statusKeyToStatus: Record<string, OrderStatus> = {
    inquiry: 'Inquiry',
    confirmed: 'Confirmed',
    inProduction: 'In Production',
    readyToShip: 'Ready to Ship',
    shipped: 'Shipped',
    invoiced: 'Invoiced',
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // First, sync with Typeform to get latest orders
      await syncTypeformOrders(TYPEFORM_FORM_ID);

      // Then fetch all orders from database
      const ordersResponse = await fetchOrders();
      const historyResponse = await fetchOrderHistory();

      if (ordersResponse.data) {
        setOrders(ordersResponse.data);

        // Generate history from statusDates
        // For each order, create a history entry for EACH status that has a date
        const generatedHistory: IOrderHistory[] = [];

        ordersResponse.data.forEach((order: IOrder) => {
          // Check if statusDates has any non-null values
          const hasStatusDates =
            order.statusDates &&
            Object.values(order.statusDates).some((date) => date !== null);

          if (hasStatusDates && order.statusDates) {
            // Create an entry for each status that has a date
            Object.entries(order.statusDates).forEach(([key, dateStr]) => {
              if (dateStr) {
                const status = statusKeyToStatus[key];
                generatedHistory.push({
                  id: `${order.uuid}-${key}`,
                  orderUuid: order.uuid,
                  orderName: order.name,
                  change: `Order ${order.name} ??? ${status}`,
                  status,
                  statusUpdateDate: dateStr,
                  timestamp: dateStr,
                });
              }
            });
          } else {
            // Fallback for orders without statusDates or with all null values (legacy data)
            const statusUpdateDate =
              order.status === 'Inquiry'
                ? order.submittedAt ||
                  order.createdAt ||
                  new Date().toISOString()
                : order.updatedAt || new Date().toISOString();

            generatedHistory.push({
              id: order.uuid,
              orderUuid: order.uuid,
              orderName: order.name,
              change: `Order ${order.name} ??? ${order.status}`,
              status: order.status,
              statusUpdateDate,
              timestamp: statusUpdateDate,
            });
          }
        });

        // Sort by status update date (most recent first)
        generatedHistory.sort(
          (a, b) =>
            new Date(b.statusUpdateDate).getTime() -
            new Date(a.statusUpdateDate).getTime(),
        );

        setHistory(generatedHistory);
      }
      if (historyResponse.data && historyResponse.data.length > 0) {
        // If backend provides history, use it instead
        setHistory(historyResponse.data);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error loading dashboard data:', error);
      // Still try to fetch existing orders even if sync fails
      try {
        const ordersResponse = await fetchOrders();
        if (ordersResponse.data) {
          setOrders(ordersResponse.data);

          // Generate history from statusDates (same logic as above)
          const generatedHistory: IOrderHistory[] = [];

          ordersResponse.data.forEach((order: IOrder) => {
            // Check if statusDates has any non-null values
            const hasStatusDates =
              order.statusDates &&
              Object.values(order.statusDates).some((date) => date !== null);

            if (hasStatusDates && order.statusDates) {
              Object.entries(order.statusDates).forEach(([key, dateStr]) => {
                if (dateStr) {
                  const status = statusKeyToStatus[key];
                  generatedHistory.push({
                    id: `${order.uuid}-${key}`,
                    orderUuid: order.uuid,
                    orderName: order.name,
                    change: `Order ${order.name} ??? ${status}`,
                    status,
                    statusUpdateDate: dateStr,
                    timestamp: dateStr,
                  });
                }
              });
            } else {
              // Fallback for orders without statusDates or with all null values
              const statusUpdateDate =
                order.status === 'Inquiry'
                  ? order.submittedAt ||
                    order.createdAt ||
                    new Date().toISOString()
                  : order.updatedAt || new Date().toISOString();

              generatedHistory.push({
                id: order.uuid,
                orderUuid: order.uuid,
                orderName: order.name,
                change: `Order ${order.name} ??? ${order.status}`,
                status: order.status,
                statusUpdateDate,
                timestamp: statusUpdateDate,
              });
            }
          });

          generatedHistory.sort(
            (a, b) =>
              new Date(b.statusUpdateDate).getTime() -
              new Date(a.statusUpdateDate).getTime(),
          );

          setHistory(generatedHistory);
        }
      } catch (fetchError) {
        // eslint-disable-next-line no-console
        console.error('Error fetching orders:', fetchError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: COLORS.primaryRed }}>
      <DashboardHeader />
      <Box sx={{ p: 3 }}>
        <Grid
          container
          spacing={3}
          sx={{ minHeight: 'calc(100vh - 120px)', height: 'auto' }}
        >
          {/* Main Content Area */}
          <Grid item xs={12} md={9}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              {/* Current Orders Section */}
              <Paper
                sx={{
                  p: 2,
                  mb: 2,
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
                    mb: 2,
                    display: 'inline-block',
                    width: 'fit-content',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Current Orders
                  </Typography>
                </Box>

                <Tabs
                  value={currentTab}
                  onChange={handleTabChange}
                  sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
                >
                  <Tab label="Other order info" />
                  <Tab label="Finance Info" />
                </Tabs>

                <TabPanel value={currentTab} index={0}>
                  <OrderFiltersComponent
                    filters={filters}
                    onFiltersChange={setFilters}
                  />
                  <Box>
                    <OrderTable orders={orders} filters={filters} />
                  </Box>
                </TabPanel>

                <TabPanel value={currentTab} index={1}>
                  <Typography variant="body1" color="text.secondary">
                    Finance Info content will go here
                  </Typography>
                </TabPanel>
              </Paper>

              {/* Cool Graphs Section */}
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: COLORS.white,
                  borderRadius: 2,
                  minHeight: '500px',
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
                    Order Flows
                  </Typography>
                </Box>
                <CoolGraphs orders={orders} />
              </Paper>
            </Box>
          </Grid>

          {/* History Sidebar */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                position: 'sticky',
                top: 24,
                maxHeight: 'calc(100vh - 180px)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: COLORS.white,
                  borderRadius: 2,
                  maxHeight: '100%',
                  overflow: 'hidden',
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
                    flexShrink: 0,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    History
                  </Typography>
                </Box>
                <Box sx={{ overflow: 'auto', flex: 1 }}>
                  <HistorySidebar history={history} />
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DashboardPage;
