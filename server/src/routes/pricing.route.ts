/**
 * Specifies the middleware and controller functions to call for each route
 * relating to pricing (discount codes and popcorn prices).
 */
import express from 'express';
import {
  getAllDiscountCodes,
  getDiscountCodeById,
  createDiscountCode,
  updateDiscountCode,
  deleteDiscountCode,
  getDiscountCodeByCodePublic,
  getPopcornPrices,
  getPopcornPricesPublic,
  updatePopcornPrices,
} from '../controllers/pricing.controller.ts';
import { isAuthenticated } from '../controllers/auth.middleware.ts';

const router = express.Router();

/**
 * Discount Code Routes
 */
router.get('/discount-codes', isAuthenticated, getAllDiscountCodes);
router.get('/discount-codes/:id', isAuthenticated, getDiscountCodeById);
router.post('/discount-codes', isAuthenticated, createDiscountCode);
router.put('/discount-codes/:id', isAuthenticated, updateDiscountCode);
router.delete('/discount-codes/:id', isAuthenticated, deleteDiscountCode);
router.get('/discount-codes/code/:code', getDiscountCodeByCodePublic);

/**
 * Popcorn Price Routes
 */
router.get('/popcorn-prices', isAuthenticated, getPopcornPrices);
router.put('/popcorn-prices', isAuthenticated, updatePopcornPrices);
router.get('/popcorn-prices/public', getPopcornPricesPublic);

export default router;
