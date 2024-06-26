export enum SuccessStatusCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
}
export enum BadStatusCodes {
  BAD_REQUEST = 400,
  NOT_AUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIME_OUT = 407,

  UNSUPPORTED_MEDIA_TYPE = 415,
  TO_MANY_REQUEST = 429,

  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  GATEWAY_TIMEOUT = 504,
}