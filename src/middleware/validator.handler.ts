import {Request, Response, NextFunction} from 'express'
import boom from '@hapi/boom'
import joi from 'joi'

export function validatorHandler(schema: joi.ObjectSchema, property: keyof Request) {
  return function (req: Request, res: Response, next: NextFunction) {
    const data = req[property]
    const {error} = schema.validate(data, {abortEarly: false});
    console.log(error)
    if (error) {
      next(boom.badRequest(error.message));
    }
    next()
  }
}
