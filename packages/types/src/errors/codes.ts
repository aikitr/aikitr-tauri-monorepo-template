export type ErrorCode =
  | 'UNKNOWN'
  | 'NETWORK'
  | 'TIMEOUT'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL';

export interface ErrorPayload {
  readonly code: ErrorCode;
  readonly message: string;
  readonly details?: unknown;
}
