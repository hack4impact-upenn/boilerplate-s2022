import { getData, postData, deleteData, putData } from '../util/api.tsx';

/**
 * API functions for order management
 */

/**
 * Delete all orders from the database
 */
export async function deleteAllOrders() {
  const response = await deleteData('orders/all', {});
  return response;
}

/**
 * Sync orders from Typeform and save to MongoDB
 * @param formId - The Typeform form ID to sync from
 */
export async function syncTypeformOrders(formId: string) {
  const response = await postData(`orders/ingest/${formId}`, {});
  return response;
}

/**
 * Fetch all orders from database
 */
export async function fetchOrders() {
  const response = await getData('orders/all');
  return response;
}

/**
 * Fetch order history
 */
export async function fetchOrderHistory() {
  // TODO: Connect to backend endpoint
  // const response = await getData('orders/history');
  // return response;

  // Placeholder: return mock data for now
  return {
    data: [],
    error: null,
  };
}

/**
 * Fetch order statistics for graphs
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchOrderStatistics(_orderType: string) {
  // TODO: Connect to backend endpoint
  // const response = await getData(`orders/statistics?type=${orderType}`);
  // return response;

  // Placeholder: return mock data for now
  return {
    data: [],
    error: null,
  };
}

/**
 * Fetch a single order by ID (orderId/uuid) or name
 * @param id - The order ID (orderId/uuid) or name to search for
 */
export async function fetchOrderById(id: string) {
  const response = await getData(`orders/${id}`);
  return response;
}

/**
 * Search orders by email or name
 */
export async function searchOrdersByCustomer(query: string) {
  const response = await getData(
    `orders/search?query=${encodeURIComponent(query)}`,
  );
  return response;
}

/**
 * Update an order by ID
 * @param id - The order ID (orderId/uuid) to update
 * @param orderData - The order data to update
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateOrder(id: string, orderData: any) {
  const response = await putData(`orders/${id}`, orderData);
  return response;
}

/**
 * Seed sample orders with status history for testing/demos
 */
export async function seedSampleOrders() {
  const response = await postData('orders/seed-sample', {});
  return response;
}

/**
 * Delete sample orders (those with uuid starting with 'sample-')
 */
export async function deleteSampleOrders() {
  const response = await deleteData('orders/seed-sample', {});
  return response;
}

