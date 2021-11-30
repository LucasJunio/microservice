import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpGet, response, interfaces, requestHeaders } from 'inversify-express-utils'
import { TYPE } from '../../../constants/types'
import Handlers from '../../../core/handlers'
import { UsinaService } from './usinaService'

@controller('/api/v1/usina')
export class UsinaController implements interfaces.Controller {
  @inject(TYPE.UsinaService)
  private readonly usinaService: UsinaService

  @httpGet('/')
  public async getUsinas(@response() res: Response): Promise<Response> {
    try {
      const data = await this.usinaService.getUsinas()
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/all')
  public async getUsinasAll(
    @response() res: Response,
    @requestHeaders('authorization') authorization: string
  ): Promise<Response> {
    try {
      const data = await this.usinaService.getUsinasAll(authorization)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
}
