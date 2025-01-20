import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import httpStatus from 'http-status'

export function validateBody(schema: ZodSchema) {
  return validate(schema, 'body');
}

export function validateParams(schema: ZodSchema) {
  return validate(schema, 'params')
}

function validate(schema: ZodSchema, type: 'body' | 'params') {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[type])
    if (!result.success) {
      const errors = result.error.errors.
        map((error) => `${error.path} ${error.message}`)
      res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
      return;
    }
    next();
  }
}