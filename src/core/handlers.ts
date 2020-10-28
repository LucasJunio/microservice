import { NextFunction, Request, Response } from 'express'
import * as HttpStatus from 'http-status'
import { logger } from '../util/logger'

class Handlers {
  public onSuccess(res: Response, data: any): Response {
    return res.status(HttpStatus.OK).json(data)
  }

  public onError(res: Response, message: string, err: any): Response {
    logger.error(`ERRO: ${err.name}, Message: ${err.message} - Parameters: [${err.parameters}] `)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
  }

  public errorHandlerApi(err: Error, req: Request, res: Response, next: NextFunction): Response {
    logger.error(`API error handler executed: ${err}`)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errorCode: 'ERR-001', message: 'Internal Server Error' })
  }

  public onBadRequest(res: Response, message: string): Response {
    return res.status(HttpStatus.BAD_REQUEST).json({ message })
  }

  public conflict(res: Response, message: string): Response {
    return res.status(HttpStatus.CONFLICT).json({ message })
  }
}

export default new Handlers()
