import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpGet, response, interfaces } from 'inversify-express-utils'

import { TYPE } from '../../../constants/types'
import Handlers from '../../../core/handlers'
import { MapaService } from './mapaService'

@controller('/api/v1/mapa')
export class MapaController implements interfaces.Controller {
  @inject(TYPE.MapaService)
  private readonly mapaService: MapaService

  @httpGet('/')
  public async getParadas(@response() res: Response): Promise<Response> {
    try {
      const data = await this.mapaService.getParadas()
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
}
