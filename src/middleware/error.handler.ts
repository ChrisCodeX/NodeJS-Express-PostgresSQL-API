import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom'

export function logErrors (err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('log')
  console.error(err);
  next(err)
}

export function boomErrorHandler(err: boom.Boom, req: Request, res: Response, next: NextFunction) {
  if (err.isBoom) {
    console.log('Boom')
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err)
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('errorHandler')
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
  next()
}


