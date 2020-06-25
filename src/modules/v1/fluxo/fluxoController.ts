import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPut, response, interfaces, httpPost, requestBody, requestHeaders } from 'inversify-express-utils'
import { TYPE } from '../../../constants/types'
import Handlers from '../../../core/handlers'
import { FluxoService } from './fluxoService'
import { ProgramacaoFluxoService } from './programacaoFluxoService'

@controller('/api/v1/fluxo')
export class FluxoController implements interfaces.Controller {
  @inject(TYPE.FluxoService)
  private readonly fluxoService: FluxoService

  // @inject(TYPE.ProgramacaoFluxoService)
  // private readonly programacaoFluxoService: ProgramacaoFluxoService

  @httpPost('/')
  public async getUsinas(@response() res: Response): Promise<Response> {
    try {
      return Handlers.onSuccess(res, { ok: true })
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
  @httpPut('/exec/next_level')
  public async execNextLevel(@response() res: Response, @requestBody() parada: any, @requestHeaders('authorization') authorization: string): Promise<Response> {
    try {
      const data = await this.fluxoService.execNextLevel(parada, authorization)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpPut('/prog/next_level')
  public async nextLevel(@response() res: Response, @requestBody() parada: any, @requestHeaders('authorization') authorization: string): Promise<Response> {
    try {
      const data = await this.fluxoService.nextLevel(parada, authorization)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpPut('/repr/next_level')
  public async reprNextLevel(@response() res: Response, @requestBody() parada: any, @requestHeaders('authorization') authorization: string): Promise<Response> {
    try {
      const data = await this.fluxoService.reprNextLevel(parada, authorization)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpPut('/prog/prev_level')
  public async prevLevel(@response() res: Response, @requestBody() parada: any, @requestHeaders('authorization') authorization: string): Promise<Response> {
    try {
      const data = await this.fluxoService.prevLevel(parada, authorization)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
}
