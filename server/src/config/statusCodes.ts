// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
enum StatusCode {
  // Successful
  OK = 200,
  CREATED = 201,

  // Client Error
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,

  // Server Error
  INTERNAL_SERVER_ERROR = 500,
}

export default StatusCode;
