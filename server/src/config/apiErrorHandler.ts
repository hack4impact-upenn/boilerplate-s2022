import express from 'express';
import ApiError from './ApiError';
import StatusCode from './StatusCode';

/**
 * The final error handler for all errors encountered in the server. Responsible
 * for what is ultimately sent to the client.
 * @param err The error propogated by a previous route handler. Could be an
 * {@link Error} or a custom {@link ApiError}
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction provided by Express
 */
const apiErrorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction,
) => {
  console.log(`got error ${err}`);
  if (err instanceof ApiError) {
    res.status(err.code).send({ error: err.message });
    return;
  }
  // Generic error to return
  res
    .status(StatusCode.INTERNAL_SERVER_ERROR)
    .send({ error: 'Something went wrong' });
};

export default apiErrorHandler;
