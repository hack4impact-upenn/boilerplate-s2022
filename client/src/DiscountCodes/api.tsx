import { getData, postData, putData, deleteData } from '../util/api.tsx';

/**
 * API functions for discount codes
 */

/**
 * Fetch all discount codes
 */
export async function fetchDiscountCodes() {
  const response = await getData('pricing/discount-codes');
  return response;
}

/**
 * Fetch a single discount code by ID
 */
export async function fetchDiscountCodeById(id: string) {
  const response = await getData(`pricing/discount-codes/${id}`);
  return response;
}

/**
 * Create a new discount code
 */
export async function createDiscountCode(data: {
  code?: string;
  price?: number;
  popcornPrices?: {
    caramel: number;
    respresso: number;
    butter: number;
    cheddar: number;
    kettle: number;
  };
  description?: string;
  isActive?: boolean;
}) {
  const response = await postData('pricing/discount-codes', data);
  return response;
}

/**
 * Update a discount code
 */
export async function updateDiscountCode(
  id: string,
  data: {
    code?: string;
    price?: number;
    popcornPrices?: {
      caramel: number;
      respresso: number;
      butter: number;
      cheddar: number;
      kettle: number;
    };
    description?: string;
    isActive?: boolean;
  },
) {
  const response = await putData(`pricing/discount-codes/${id}`, data);
  return response;
}

/**
 * Delete a discount code
 */
export async function deleteDiscountCode(id: string) {
  const response = await deleteData(`pricing/discount-codes/${id}`, {});
  return response;
}

/**
 * API functions for popcorn prices
 */

/**
 * Fetch popcorn prices
 */
export async function fetchPopcornPrices() {
  const response = await getData('pricing/popcorn-prices');
  return response;
}

/**
 * Update popcorn prices
 */
export async function updatePopcornPrices(data: {
  caramel: number;
  respresso: number;
  butter: number;
  cheddar: number;
  kettle: number;
}) {
  const response = await putData('pricing/popcorn-prices', data);
  return response;
}
