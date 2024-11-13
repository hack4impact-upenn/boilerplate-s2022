import express from 'express';
import { ILocation } from '../models/location.model.ts';
import ApiError from '../util/apiError.ts';
import {
  createLocation,
  getAllLocations,
  getLocationByName,
  deleteLocationByName,
} from '../services/location.service.ts';
import StatusCode from '../util/statusCode.ts';

const addLocation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const Location: ILocation | null = req.body as ILocation;
  if (!Location) {
    next(ApiError.missingFields(['Location']));
    return;
  }
  /* const { firstName, imageURL,imageTitle, toxicTrait1, toxicTrait2, toxicTrait3, toxicTrait4, toxicTrait5 } = req.body; */
  // eslint-disable-next-line consistent-return
  return createLocation(Location);
};

const getLocations = async (
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction,
) => {
  const people = await getAllLocations(); // Call the service function to get data
  res.status(200).json({ data: people });
};

const deleteLocation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { name } = req.params;
  if (!name) {
    next(ApiError.missingFields(['name']));
    return;
  }

  // Check if location to delete is an a valid location
  const location: ILocation | null = await getLocationByName(name);
  if (!location) {
    next(ApiError.notFound(`User with location ${location} does not exist`));
    return;
  }

  deleteLocationByName(location.name)
    .then(() => res.sendStatus(StatusCode.OK))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Failed to delete location.'));
    });
};

export { addLocation, getLocations, deleteLocation };
