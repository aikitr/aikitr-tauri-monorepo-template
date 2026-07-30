/**
 * Application-level error model. Wraps a backend `AppError` or a network error
 * and normalizes it for UI consumption.
 */

import { BusinessError, type ErrorCode, type ErrorPayload } from '@aikitr/types';
import { ApiError } from '@aikitr/utils';

export type { ErrorPayload, ErrorCode };

export class AppError extends Error {
  readonly code: ErrorCode | string;
  readonly status: number;
  readonly details: unknown;

  constructor(code: ErrorCode | string, message: string, status = 0, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
    this.details = details;
  }

  static from(error: unknown): AppError {
    if (error instanceof AppError) return error;
    if (error instanceof BusinessError) {
      return new AppError(error.code, error.message, 0, error.details as unknown);
    }
    if (error instanceof ApiError) {
      return new AppError(error.code as ErrorCode, error.message, error.status, error.details as unknown);
    }
    if (error instanceof Error) return new AppError('UNKNOWN', error.message);
    return new AppError('UNKNOWN', String(error));
  }

  toPayload(): ErrorPayload {
    return {
      code: this.code as ErrorCode,
      message: this.message,
      details: this.details,
    };
  }
}
