/* eslint-disable consistent-return */
import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { IKitchenOutcomes } from '../models/kitchen.outcomes.model.ts';
import { getOneKitchenOutcomes } from '../services/kitchen.outcomes.service.ts';

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
