import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import { ValidationError } from 'sequelize';

export function logErrors (err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('Log error')
  console.error(err);
  next(err)
}

export function boomErrorHandler(err: boom.Boom, req: Request, res: Response, next: NextFunction) {
  if (err.isBoom) {
    console.log('Boom')
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err)
  }
}

export function dbErrorHandler(err: ValidationError, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidationError) {
    console.log('Database error')
    res.status(409).json({
      statusCode: 409,
      error: "Database error - "+err.errors[0].type,
      message: err.errors[0]
    })
  } else {
    next(err)
  }
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Error) {
    console.log('errorHandler')
    res.status(500).json({
      message: err.message,
      stack: err.stack
    })
  } else {
    next(err)
  }
}