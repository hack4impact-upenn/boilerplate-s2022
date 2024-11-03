/* eslint-disable consistent-return */
import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { IKitchenOutcomes } from '../models/kitchen.outcomes.model.ts';
import {
  getOneKitchenOutcomes,
  getAllKitchenOutcomes,
  getAllOrganizations,
  getAllYearsForOrganization,
} from '../services/kitchen.outcomes.service.ts';

const getOneKitchenOutcomesController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { year, orgName } = req.params;
  if (!year || !orgName) {
    next(ApiError.missingFields(['year', 'orgName']));
    return;
  }
  const yearDate = new Date(year);
  return getOneKitchenOutcomes(yearDate, orgName)
    .then((kitchenOutcomes: unknown) => {
      res.status(StatusCode.OK).send(kitchenOutcomes);
    })
    .catch(() => {
      next(
        ApiError.internal(
          'Unable to retrieve kitchen outcomes by year and orgName',
        ),
      );
    });
};

export { getOneKitchenOutcomesController };

const getAllKitchenOutcomesController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const kitchenOutcomes = await getAllKitchenOutcomes();
    res.status(StatusCode.OK).send(kitchenOutcomes);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve all kitchen outcomes'));
  }
};

export { getAllKitchenOutcomesController };

const getAllOrganizationsController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const organizations = await getAllOrganizations();
    res.status(StatusCode.OK).send(organizations);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve organizations'));
  }
};

export { getAllOrganizationsController };

const getAllYearsForOrganizationController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { orgName } = req.params;

  if (!orgName) {
    next(ApiError.missingFields(['organizationName']));
    return;
  }

  try {
    const years = await getAllYearsForOrganization(orgName);
    res.status(StatusCode.OK).send(years);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve years for the organization'));
  }
};

export { getAllYearsForOrganizationController };
