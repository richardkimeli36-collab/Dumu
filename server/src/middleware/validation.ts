import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { createApiError } from './errorHandler';

export function validateRequest(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));
      throw createApiError('VALIDATION_ERROR', 'Invalid request data', 400, details);
    }

    req.body = value;
    next();
  };
}
