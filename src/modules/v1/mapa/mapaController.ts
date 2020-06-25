import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPost, response, interfaces, requestBody } from 'inversify-express-utils'

import { TYPE } from '../../../constants/types'
import Handlers from '../../../core/handlers'
import { MapaService } from './mapaService'
import ConsultaMapaPpVDto from '../../../entities/consultaMapaPpVDto'

@controller('/api/v1/mapa')
export class MapaController implements interfaces.Controller {
  @inject(TYPE.MapaService)
  private readonly mapaService: MapaService

  @httpPost('/')
  public async getParadas(@response() res: Response, @requestBody() filter: ConsultaMapaPpVDto): Promise<Response> {
    try {
      const data = await this.mapaService.getParadas(filter)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
}
