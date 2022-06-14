export enum ResponseDescription {
  OK = 'The request was successful',
  CREATED = 'The resource was created or the operation not guaranteed to be idempotent succeeded',
  BAD_REQUEST = 'The request is not valid',
  NOT_FOUND = 'No transaction found matching the given id',
  DUPLICATE_ENTRY='Duplicate Transaction found',
  UNPROCESSABLE_ENTITY = 'The server understood the request and the syntax is correct, but could not fulfill the request',
  INTERNAL_SERVER_ERROR = 'An unexpected error occurred inside the server',
}
