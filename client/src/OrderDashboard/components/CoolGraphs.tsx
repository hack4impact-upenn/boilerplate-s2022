import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { IOrder, OrderStatus } from '../../util/types/order.ts';
import COLORS from '../../assets/colors.ts';

interface CoolGraphsProps {
  orders: IOrder[];
}

/**
 * Component for displaying order statistics graphs
 */
function CoolGraphs({ orders }: CoolGraphsProps) {
  // Process history data to create timeseries data
  const timeseriesData = useMemo(() => {
    if (orders.length === 0) return [];

    const statusTypes: OrderStatus[] = [
      'Inquiry',
      'Confirmed',
      'In Production',
      'Ready to Ship',
      'Shipped',
      'Invoiced',
    ];

    const statusKeyToStatus: Record<string, OrderStatus> = {
      inquiry: 'Inquiry',
      confirmed: 'Confirmed',
      inProduction: 'In Production',
      readyToShip: 'Ready to Ship',
      shipped: 'Shipped',
      invoiced: 'Invoiced',
    };

    const oneDayMs = 24 * 60 * 60 * 1000;
    const startOfDayUtc = (date: Date) =>
      new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
      );
    const dateKey = (date: Date) => date.toISOString().split('T')[0];
    const today = startOfDayUtc(new Date());

    const dateMap = new Map<string, Record<OrderStatus, number>>();

    const ensureDate = (key: string) => {
      if (!dateMap.has(key)) {
        const blank = {} as Record<OrderStatus, number>;
        statusTypes.forEach((status) => {
          blank[status] = 0;
        });
        dateMap.set(key, blank);
      }
      return dateMap.get(key)!;
    };

    orders.forEach((order) => {
      const statusEntries: Array<{ status: OrderStatus; date: Date }> = [];

      if (order.statusDates) {
        Object.entries(order.statusDates).forEach(([key, value]) => {
          if (!value) return;
          const status = statusKeyToStatus[key];
          if (!status) return;
          const parsed = new Date(value);
          if (Number.isNaN(parsed.getTime())) return;
          statusEntries.push({ status, date: parsed });
        });
      }

      if (statusEntries.length === 0) {
        const fallbackDate =
          order.submittedAt ||
          order.createdAt ||
          order.updatedAt ||
          new Date().toISOString();
        const parsed = new Date(fallbackDate);
        if (!Number.isNaN(parsed.getTime())) {
          statusEntries.push({ status: order.status, date: parsed });
        }
      }

      statusEntries.sort((a, b) => a.date.getTime() - b.date.getTime());

      statusEntries.forEach((entry, index) => {
        const start = startOfDayUtc(entry.date);
        const nextEntry = statusEntries[index + 1];
        const nextStart = nextEntry ? startOfDayUtc(nextEntry.date) : null;
        const end = nextStart
          ? new Date(nextStart.getTime() - oneDayMs)
          : today;

        if (end.getTime() < start.getTime()) {
          return;
        }

        for (
          let cursor = start;
          cursor.getTime() <= end.getTime();
          cursor = new Date(cursor.getTime() + oneDayMs)
        ) {
          const key = dateKey(cursor);
          const statusCounts = ensureDate(key);
          statusCounts[entry.status] += 1;
        }
      });
    });

    const chartData = Array.from(dateMap.entries())
      .map(([date, statusCounts]) => ({
        date,
        ...statusCounts,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return chartData;
  }, [orders]);

  const colors = {
    Inquiry: '#FF9800',
    Confirmed: '#2196F3',
    'In Production': '#9C27B0',
    'Ready to Ship': '#00BCD4',
    Shipped: '#4CAF50',
    Invoiced: '#8BC34A',
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {timeseriesData.length === 0 ? (
        <Paper
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No history data available
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ flexGrow: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeseriesData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Inquiry"
                stroke={colors.Inquiry}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Confirmed"
                stroke={colors.Confirmed}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="In Production"
                stroke={colors['In Production']}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Ready to Ship"
                stroke={colors['Ready to Ship']}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Shipped"
                stroke={colors.Shipped}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Invoiced"
                stroke={colors.Invoiced}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
}

export default CoolGraphs;
