import StatusCode from './statusCode.ts';

/**
 * A custom class extending {@link Error} for defining and handling errors
 * in a consistent manner throughout the server.
 */
class ApiError extends Error {
  code: number;

  additionalInfo: any;

  /**
   * The constructor for any type of {@link ApiError}
   * @param code The HTTP status code corrsponding to the error
   * @param message A message describing the error
   * @param additionalInfo Any useful additional info to include in the error
   */
  constructor(code: number, message: string, additionalInfo: any = {}) {
    super(message);
    this.code = code;
    this.message = message;
    this.additionalInfo = additionalInfo;
  }

  //           Static functions for creating commonly used errors             //

  /**
   * Creates a 400 Bad Request Error
   * @param message A message describing the error
   * @returns An {@link ApiError} with the appropriate status code
   */
  static badRequest(message: string) {
    return new ApiError(StatusCode.BAD_REQUEST, message);
  }

  /**
   * Creates a 400 Bad Request Error with a messsage specifying the
   * required fields in the request body.
   * @param requiredFields The list of required fields
   * @returns An {@link ApiError} with the appropriate status code and message
   */
  static missingFields(requiredFields: string[]) {
    return new ApiError(
      StatusCode.BAD_REQUEST,
      `Request body needs the following fields: ${requiredFields.join(', ')}.`,
    );
  }

  /**
   * Creates a 401 Unauthorized Error
   * @param message A message describing the error
   * @returns An {@link ApiError} with the appropriate status code
   */
  static unauthorized(message: string) {
    return new ApiError(StatusCode.UNAUTHORIZED, message);
  }

  /**
   * Creates a 403 Forbidden Error
   * @param message A message describing the error
   * @returns An {@link ApiError} with the appropriate status code
   */
  static forbidden(message: string) {
    return new ApiError(StatusCode.FORBIDDEN, message);
  }

  /**
   * Creates a 404 Not Found Error
   * @param message A message describing the error
   * @returns An {@link ApiError} with the appropriate status code
   */
  static notFound(message: string) {
    return new ApiError(StatusCode.NOT_FOUND, message);
  }

  /**
   * Creates a 500 Internal Server Error
   * @param message A message describing the error
   * @returns An {@link ApiError} with the appropriate status code
   */
  static internal(message: string) {
    return new ApiError(StatusCode.INTERNAL_SERVER_ERROR, message);
  }
}

export default ApiError;
