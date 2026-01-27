/**
 * Specifies the middleware and controller functions to call for each route
 * relating to orders.
 */
import express from 'express';
import {
  ingestTypeformOrders,
  getAllOrders,
  deleteAllOrders,
  getOrderById,
  updateOrder,
  createPublicOrder,
  searchOrdersByCustomer,
  seedSampleOrdersController,
  deleteSampleOrdersController,
} from '../controllers/order.controller.ts';
import { isAuthenticated } from '../controllers/auth.middleware.ts';

const router = express.Router();

/**
 * A GET route to fetch all orders from the database.
 * Requires authentication.
 */
router.get('/all', isAuthenticated, getAllOrders);

/**
 * A POST route to ingest orders from Typeform API.
 * Expects a formId parameter in the URL.
 * Requires authentication.
 * Fetches responses from Typeform and saves new orders to MongoDB.
 */
router.post('/ingest/:formId', isAuthenticated, ingestTypeformOrders);

/**
 * Public POST route to create an order from the form clone.
 */
router.post('/public', createPublicOrder);

/**
 * A GET route to search orders by email or name.
 * Requires authentication.
 */
router.get('/search', isAuthenticated, searchOrdersByCustomer);

/**
 * A DELETE route to delete all orders from the database.
 * Requires authentication.
 */
router.delete('/all', isAuthenticated, deleteAllOrders);

/**
 * A POST route to seed sample orders with status history.
 * Useful for testing and demos.
 * Requires authentication.
 */
router.post('/seed-sample', isAuthenticated, seedSampleOrdersController);

/**
 * A DELETE route to delete only sample orders (uuid starts with 'sample-').
 * Requires authentication.
 */
router.delete('/seed-sample', isAuthenticated, deleteSampleOrdersController);

/**
 * A GET route to fetch a single order by ID (orderId/uuid) or name.
 * Requires authentication.
 */
router.get('/:id', isAuthenticated, getOrderById);

/**
 * A PUT route to update an order by ID (orderId/uuid).
 * Requires authentication.
 */
router.put('/:id', isAuthenticated, updateOrder);

export default router;
