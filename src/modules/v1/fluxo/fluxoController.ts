import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPut, response, interfaces, httpPost, requestBody } from 'inversify-express-utils'
import { TYPE } from '../../../constants/types'
import Handlers from '../../../core/handlers'
import { FluxoService } from './fluxoService'

@controller('/api/v1/fluxo')
export class FluxoController implements interfaces.Controller {
  @inject(TYPE.FluxoService)
  private readonly fluxoService: FluxoService

  @httpPost('/')
  public async getUsinas(@response() res: Response): Promise<Response> {
    try {
      return Handlers.onSuccess(res, { ok: true })
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
  @httpPut('/exec/next_level')
  public async execNextLevel(@response() res: Response, @requestBody() parada: any): Promise<Response> {
    try {
      const data = await this.fluxoService.execNextLevel(parada)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpPut('/prog/next_level')
  public async nextLevel(@response() res: Response, @requestBody() parada: any): Promise<Response> {
    try {
      const data = await this.fluxoService.nextLevel(parada)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpPut('/repr/next_level')
  public async reprNextLevel(@response() res: Response, @requestBody() parada: any): Promise<Response> {
    try {
      const data = await this.fluxoService.reprNextLevel(parada)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpPut('/prog/prev_level')
  public async prevLevel(@response() res: Response, @requestBody() parada: any): Promise<Response> {
    try {
      const data = await this.fluxoService.prevLevel(parada)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
}
