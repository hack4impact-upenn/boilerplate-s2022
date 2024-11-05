/* eslint-disable consistent-return */
import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { IProgramOutcomes } from '../models/program.outcomes.model.ts';
import {
  getOneProgramOutcomes,
  getAllProgramOutcomesByYear,
} from '../services/program.outcomes.service.ts';

const getOneProgramOutcomesController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { year, orgId } = req.params;
  if (!year || !orgId) {
    next(ApiError.missingFields(['year', 'orgId']));
    return;
  }
  const yearDate = new Date(year);
  return getOneProgramOutcomes(yearDate, orgId)
    .then((kitchenOutcomes: unknown) => {
      res.status(StatusCode.OK).send(kitchenOutcomes);
    })
    .catch(() => {
      next(
        ApiError.internal(
          'Unable to retrieve program outcomes by year and orgId',
        ),
      );
    });
};

const getAllProgramOutcomesByYearController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { year } = req.params;
  if (!year) {
    next(ApiError.missingFields(['year']));
    return;
  }
  const yearDate = new Date(year);
  return getAllProgramOutcomesByYear(yearDate)
    .then((programOutcomes: IProgramOutcomes[]) => {
      res.status(StatusCode.OK).send(programOutcomes);
    })
    .catch(() => {
      next(ApiError.internal('Unable to retrieve program outcomes by year'));
    });
};

export {
  getOneProgramOutcomesController,
  getAllProgramOutcomesByYearController,
};
