type AppErrorTypes =
  "conflict"
  | "not-found"
  | "unauthorized"
  | "unprocessable-entity"
  | "bad-request"

export interface AppError{
  type: AppErrorTypes;
  message: string | undefined;
}

export function isAppError(error: object):error is AppError{
  return (error as AppError).type !== undefined;
}

export function errorStatusCode(type: AppErrorTypes){
  switch (type) {
    case "conflict":
      return 409;
    case "not-found":
      return 404;
    case "unauthorized":
      return 401;
    case "unprocessable-entity":
      return 422;  
    default:
      return 400;
  }
}

export function conflictError(message?: string): AppError{
  return {type: "conflict", message }
}

export function notFoundError(message?:string): AppError{
  return {type: "not-found", message}
}

export function unauthorizedError(message?:string): AppError{
  return {type: "unauthorized", message}
}

export function unprocessableEntityError(message?:string): AppError{
  return {type: "unprocessable-entity", message}
}

export function badRequestError(message?:string): AppError{
  return {type: "bad-request", message}
}