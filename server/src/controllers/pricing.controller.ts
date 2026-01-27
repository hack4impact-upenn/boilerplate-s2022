/**
 * Controller functions for handling pricing-related operations,
 * including discount codes and popcorn prices.
 */
import express from 'express';
import { randomUUID } from 'crypto';
import { DiscountCode } from '../models/discountCode.model.ts';
import { PopcornPrice } from '../models/popcornPrice.model.ts';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';

/**
 * Controller function to get all discount codes
 */
const getAllDiscountCodes = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const codes = await DiscountCode.find({}).sort({ createdAt: -1 }).exec();
    res.status(StatusCode.OK).json(codes);
  } catch (error: any) {
    console.error('Error fetching discount codes:', error);
    next(ApiError.internal(`Error fetching discount codes: ${error.message}`));
  }
};

/**
 * Controller function to get a single discount code by ID
 */
const getDiscountCodeById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { id } = req.params;
    const code = await DiscountCode.findById(id).exec();
    if (!code) {
      next(ApiError.notFound(`Discount code with ID "${id}" not found`));
      return;
    }
    res.status(StatusCode.OK).json(code);
  } catch (error: any) {
    console.error('Error fetching discount code:', error);
    next(ApiError.internal(`Error fetching discount code: ${error.message}`));
  }
};

/**
 * Controller function to create a new discount code
 */
const createDiscountCode = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { code, price, popcornPrices, description, isActive, email } = req.body;
    const isValidNumber = (value: unknown) =>
      typeof value === 'number' && Number.isFinite(value);

    // Generate UUID if code not provided
    const discountCode = code || randomUUID();

    // Check if code already exists
    const existingCode = await DiscountCode.findOne({
      code: discountCode,
    }).exec();
    if (existingCode) {
      next(
        ApiError.badRequest(`Discount code "${discountCode}" already exists`),
      );
      return;
    }

    // Handle pricing: if popcornPrices provided, use it; if price provided, set all to that; otherwise default to 5.75
    let finalPrice = 5.75;
    let finalPopcornPrices;

    if (popcornPrices) {
      // Validate popcornPrices
      const flavors = ['caramel', 'respresso', 'butter', 'cheddar', 'kettle'];
      for (const flavor of flavors) {
        if (
          popcornPrices[flavor] === undefined ||
          !isValidNumber(popcornPrices[flavor]) ||
          popcornPrices[flavor] < 0
        ) {
          next(
            ApiError.badRequest(
              `Price for ${flavor} is required and must be >= 0`,
            ),
          );
          return;
        }
      }
      finalPopcornPrices = popcornPrices;
      // Use average price as the main price field for backward compatibility
      const prices = Object.values(popcornPrices) as number[];
      finalPrice = prices.reduce((sum, p) => sum + p, 0) / prices.length;
    } else if (price !== undefined) {
      if (!isValidNumber(price) || price < 0) {
        next(ApiError.badRequest('Price must be >= 0'));
        return;
      }
      finalPrice = price;
      // Set all flavors to the same price
      finalPopcornPrices = {
        caramel: price,
        respresso: price,
        butter: price,
        cheddar: price,
        kettle: price,
      };
    } else {
      // Default to 5.75 for all
      finalPopcornPrices = {
        caramel: 5.75,
        respresso: 5.75,
        butter: 5.75,
        cheddar: 5.75,
        kettle: 5.75,
      };
    }

    const newCode = new DiscountCode({
      code: discountCode,
      email: typeof email === 'string' ? email.trim().toLowerCase() : '',
      price: finalPrice,
      popcornPrices: finalPopcornPrices,
      description: description || '',
      isActive: isActive !== undefined ? isActive : true,
    });

    const savedCode = await newCode.save();
    res.status(StatusCode.CREATED).json(savedCode);
  } catch (error: any) {
    console.error('Error creating discount code:', error);
    if (error.code === 11000) {
      next(ApiError.badRequest('Discount code already exists'));
    } else {
      next(ApiError.internal(`Error creating discount code: ${error.message}`));
    }
  }
};

/**
 * Controller function to update a discount code
 */
const updateDiscountCode = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { id } = req.params;
    const { code, price, popcornPrices, description, isActive, email } = req.body;
    const isValidNumber = (value: unknown) =>
      typeof value === 'number' && Number.isFinite(value);

    const discountCode = await DiscountCode.findById(id).exec();
    if (!discountCode) {
      next(ApiError.notFound(`Discount code with ID "${id}" not found`));
      return;
    }

    // Update fields if provided
    if (code !== undefined) {
      // Check if new code already exists (and is different from current)
      if (code !== discountCode.code) {
        const existingCode = await DiscountCode.findOne({ code }).exec();
        if (existingCode) {
          next(ApiError.badRequest(`Discount code "${code}" already exists`));
          return;
        }
      }
      discountCode.code = code;
    }

    // Handle pricing updates
    if (popcornPrices !== undefined) {
      // Validate popcornPrices
      const flavors = ['caramel', 'respresso', 'butter', 'cheddar', 'kettle'];
      for (const flavor of flavors) {
        if (
          popcornPrices[flavor] === undefined ||
          !isValidNumber(popcornPrices[flavor]) ||
          popcornPrices[flavor] < 0
        ) {
          next(
            ApiError.badRequest(
              `Price for ${flavor} is required and must be >= 0`,
            ),
          );
          return;
        }
      }
      discountCode.popcornPrices = popcornPrices;
      // Update main price field to average for backward compatibility
      const prices = Object.values(popcornPrices) as number[];
      discountCode.price = prices.reduce((sum, p) => sum + p, 0) / prices.length;
    } else if (price !== undefined) {
      if (!isValidNumber(price) || price < 0) {
        next(ApiError.badRequest('Price must be >= 0'));
        return;
      }
      discountCode.price = price;
      // If popcornPrices doesn't exist, create it; otherwise update all to same price
      if (!discountCode.popcornPrices) {
        discountCode.popcornPrices = {
          caramel: price,
          respresso: price,
          butter: price,
          cheddar: price,
          kettle: price,
        };
      } else {
        discountCode.popcornPrices.caramel = price;
        discountCode.popcornPrices.respresso = price;
        discountCode.popcornPrices.butter = price;
        discountCode.popcornPrices.cheddar = price;
        discountCode.popcornPrices.kettle = price;
      }
    }

    if (description !== undefined) {
      discountCode.description = description;
    }
    if (isActive !== undefined) {
      discountCode.isActive = isActive;
    }
    if (email !== undefined) {
      discountCode.email =
        typeof email === 'string' ? email.trim().toLowerCase() : '';
    }

    const updatedCode = await discountCode.save();
    res.status(StatusCode.OK).json(updatedCode);
  } catch (error: any) {
    console.error('Error updating discount code:', error);
    if (error.code === 11000) {
      next(ApiError.badRequest('Discount code already exists'));
    } else {
      next(ApiError.internal(`Error updating discount code: ${error.message}`));
    }
  }
};

/**
 * Controller function to delete a discount code
 */
const deleteDiscountCode = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { id } = req.params;
    const code = await DiscountCode.findByIdAndDelete(id).exec();
    if (!code) {
      next(ApiError.notFound(`Discount code with ID "${id}" not found`));
      return;
    }
    res
      .status(StatusCode.OK)
      .json({ message: 'Discount code deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting discount code:', error);
    next(ApiError.internal(`Error deleting discount code: ${error.message}`));
  }
};

/**
 * Controller function to get popcorn prices
 * Returns the latest price configuration (there should only be one)
 */
const getPopcornPrices = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    let prices = await PopcornPrice.findOne({}).sort({ updatedAt: -1 }).exec();

    // If no prices exist, create default prices
    if (!prices) {
      prices = new PopcornPrice({
        caramel: 0,
        respresso: 0,
        butter: 0,
        cheddar: 0,
        kettle: 0,
      });
      await prices.save();
    }

    res.status(StatusCode.OK).json(prices);
  } catch (error: any) {
    console.error('Error fetching popcorn prices:', error);
    next(ApiError.internal(`Error fetching popcorn prices: ${error.message}`));
  }
};

/**
 * Controller function to update popcorn prices
 * Updates or creates the price configuration
 */
const updatePopcornPrices = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { caramel, respresso, butter, cheddar, kettle } = req.body;

    // Validate all prices are provided and >= 0
    const prices = { caramel, respresso, butter, cheddar, kettle };
    for (const [key, value] of Object.entries(prices)) {
      if (value === undefined) {
        next(ApiError.badRequest(`Price for ${key} is required`));
        return;
      }
      if (typeof value !== 'number' || value < 0) {
        next(ApiError.badRequest(`Price for ${key} must be a number >= 0`));
        return;
      }
    }

    // Find existing prices or create new
    let priceConfig = await PopcornPrice.findOne({})
      .sort({ updatedAt: -1 })
      .exec();

    if (priceConfig) {
      // Update existing
      priceConfig.caramel = caramel;
      priceConfig.respresso = respresso;
      priceConfig.butter = butter;
      priceConfig.cheddar = cheddar;
      priceConfig.kettle = kettle;
      await priceConfig.save();
    } else {
      // Create new
      priceConfig = new PopcornPrice({
        caramel,
        respresso,
        butter,
        cheddar,
        kettle,
      });
      await priceConfig.save();
    }

    res.status(StatusCode.OK).json(priceConfig);
  } catch (error: any) {
    console.error('Error updating popcorn prices:', error);
    next(ApiError.internal(`Error updating popcorn prices: ${error.message}`));
  }
};

/**
 * Public controller function to get popcorn prices
 */
const getPopcornPricesPublic = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    let prices = await PopcornPrice.findOne({}).sort({ updatedAt: -1 }).exec();

    if (!prices) {
      prices = new PopcornPrice({
        caramel: 5.75,
        respresso: 5.75,
        butter: 5.75,
        cheddar: 5.75,
        kettle: 5.75,
      });
      await prices.save();
    }

    res.status(StatusCode.OK).json(prices);
  } catch (error: any) {
    console.error('Error fetching public popcorn prices:', error);
    next(ApiError.internal(`Error fetching popcorn prices: ${error.message}`));
  }
};

/**
 * Public controller function to fetch a discount code by its code string
 */
const getDiscountCodeByCodePublic = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { code } = req.params;
    const discountCode = await DiscountCode.findOne({
      code,
      isActive: true,
    }).exec();

    if (!discountCode) {
      next(ApiError.notFound(`Discount code "${code}" not found`));
      return;
    }

    res.status(StatusCode.OK).json({
      code: discountCode.code,
      price: discountCode.price,
      popcornPrices: discountCode.popcornPrices,
      description: discountCode.description,
      isActive: discountCode.isActive,
      requiresEmail: Boolean(discountCode.email),
    });
  } catch (error: any) {
    console.error('Error fetching discount code by code:', error);
    next(
      ApiError.internal(`Error fetching discount code: ${error.message}`),
    );
  }
};

export {
  getAllDiscountCodes,
  getDiscountCodeById,
  createDiscountCode,
  updateDiscountCode,
  deleteDiscountCode,
  getDiscountCodeByCodePublic,
  getPopcornPrices,
  getPopcornPricesPublic,
  updatePopcornPrices,
};
