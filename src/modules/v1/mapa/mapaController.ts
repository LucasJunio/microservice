import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPost, response, interfaces, requestBody } from 'inversify-express-utils'

import { TYPE } from '../../../constants/types'
import Handlers from '../../../core/handlers'
import { MapaService } from './mapaService'
import ConsultaMapaVDto from '../../../entities/consultaMapaVDto'

@controller('/api/v1/mapa')
export class MapaController implements interfaces.Controller {
  @inject(TYPE.MapaService)
  private readonly mapaService: MapaService

  @httpPost('/pp')
  public async getParadas(@response() res: Response, @requestBody() filter: ConsultaMapaVDto): Promise<Response> {
    try {
      const data = await this.mapaService.getParadas(filter)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpPost('/di')
  public async getDi(@response() res: Response, @requestBody() filter: ConsultaMapaVDto): Promise<Response> {
    try {
      const data = await this.mapaService.getDi(filter)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpPost('/pp_di')
  public async getParadasDi(@response() res: Response, @requestBody() filter: ConsultaMapaVDto): Promise<Response> {
    try {
      const data = await this.mapaService.getParadasDi(filter)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
}
