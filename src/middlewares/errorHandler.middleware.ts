import { NextFunction, Request, Response } from "express";
import { IError } from "protocols";

export function errorHandlerMiddleware(
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction) {

  console.log(error);
  res.status(error.status).send(error.message);
}