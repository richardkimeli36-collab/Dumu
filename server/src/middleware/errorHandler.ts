import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  code: string;
  statusCode: number;
  details?: any;
}

export function createApiError(
  code: string,
  message: string,
  statusCode: number = 400,
  details?: any
): ApiError {
  const error = new Error(message) as ApiError;
  error.code = code;
  error.statusCode = statusCode;
  error.details = details;
  return error;
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'Internal server error';

  console.error(`[${code}] ${message}`, err.details);

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details: process.env.NODE_ENV === 'development' ? err.details : undefined,
    },
  });
}
