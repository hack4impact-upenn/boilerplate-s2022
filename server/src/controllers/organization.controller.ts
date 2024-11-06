import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { IOrganization } from '../models/organization.model.ts';
import {
  getOrganizationByName,
  getAllOrganizations,
} from '../services/organization.service.ts';

const getOrgByName = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { name } = req.params;
  if (!name) {
    next(ApiError.missingFields(['name']));
  }
  return getOrganizationByName(name)
    .then((org: unknown) => {
      res.status(StatusCode.OK).send(org);
    })
    .catch(() => {
      next(
        ApiError.internal(
          'Unable to retrieve the organization by the name provided',
        ),
      );
    });
};
const getAll = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return getAllOrganizations()
    .then((org: unknown) => {
      res.status(StatusCode.OK).send(org);
    })
    .catch(() => {
      next(ApiError.internal('Unable to retrieve all organizations'));
    });
};
export { getOrgByName, getAll };
