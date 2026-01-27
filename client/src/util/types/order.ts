/**
 * Order status types
 */
export type OrderStatus =
  | 'Inquiry'
  | 'Confirmed'
  | 'In Production'
  | 'Ready to Ship'
  | 'Shipped'
  | 'Invoiced';

/**
 * Popcorn types
 */
export interface PopcornQuantities {
  caramel: number;
  respresso: number;
  butter: number;
  cheddar: number;
  kettle: number;
}

/**
 * Status dates - tracks when order entered each status
 */
export interface StatusDates {
  inquiry: string | null;
  confirmed: string | null;
  inProduction: string | null;
  readyToShip: string | null;
  shipped: string | null;
  invoiced: string | null;
}

/**
 * Order interface
 */
export interface IOrder {
  uuid: string;
  email: string;
  name: string;
  amountPaid: number;
  status: OrderStatus;
  statusDates?: StatusDates;
  popcornQuantities: PopcornQuantities;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Order history entry
 */
export interface IOrderHistory {
  id: string;
  orderUuid: string;
  orderName: string;
  change: string; // e.g., "order 5 now In Production"
  status: OrderStatus;
  statusUpdateDate: string; // Date when status was updated
  timestamp: string;
}

/**
 * Order filter options
 */
export interface OrderFilters {
  customer?: string;
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  status?: OrderStatus | '';
}
