import { NextFunction, Request, Response } from "express"
import HttpResponse from "./http-response.model"
import { ApplicationError } from "./application.error"


const UNEXPECTED_ERROR = new HttpResponse<void>(500, {
  http: "Unexpected Error",
  message: "Por favor, tente novamente mais tarde.",
})

const BAD_REQUEST_ERROR = new HttpResponse<void>(400, {
  http: "Bad Request",
  message: "Requisição inválida, tente novamente ou revise algum dado.",
})

const UNAUTHORIZED_ERROR = new HttpResponse<void>(401, {
  http: "Unauthorized",
  message: "Você não está autenticado.",
})

const FORBIDDEN_ERROR = new HttpResponse<void>(403, {
  http: "Forbidden",
  message: "Você não está autorizado.",
})

const NOT_FOUND_ERROR = new HttpResponse<void>(404, {
  http: "Not Found",
  message: "Não encontrado em nossos sistemas.",
})

const UNPROCESSABLE_ENTITY = new HttpResponse<void>(422, {
  http: "Unprocessable Entity",
  message: "Revise seus dados e tente novamente.",
})

const errorHandlerMiddleware = (
  error: ApplicationError<Error>,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { statusCode } = error
  const statusCodingError: { [x: number]: HttpResponse<void> } = {
    400: BAD_REQUEST_ERROR,
    401: UNAUTHORIZED_ERROR,
    403: FORBIDDEN_ERROR,
    404: NOT_FOUND_ERROR,
    422: UNPROCESSABLE_ENTITY
  }
  let errorResponse = statusCodingError[statusCode] ?? UNEXPECTED_ERROR
  return response.status(errorResponse.statusCode).send({ ...errorResponse, ...error })
}

export default errorHandlerMiddleware
