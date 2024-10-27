/* eslint-disable consistent-return */
import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { IProgramOutcomes } from '../models/program.outcomes.model.ts';
import { getOneProgramOutcomes } from '../services/program.outcomes.service.ts';

const getOneProgramOutcomesController = async (
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
    return getOneProgramOutcomes(yearDate, orgName)
        .then((kitchenOutcomes: unknown) => {
            res.status(StatusCode.OK).send(kitchenOutcomes);
        })
        .catch(() => {
            next(
                ApiError.internal(
                    'Unable to retrieve program outcomes by year and orgName',
                ),
            );
        });
};

export { getOneProgramOutcomesController };
