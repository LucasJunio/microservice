import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpGet, httpPost, response, requestParam, interfaces, requestBody } from 'inversify-express-utils'
import { TYPE } from '../../../constants/types'
import { logger } from '../../../util/Logger'
import Handlers from '../../../core/Handlers'
import { ParadaProgramadaService } from './paradaProgramadaService'

@controller('/api/v1/parada_programada')
export class ParadaProgramadaServiceController implements interfaces.Controller {
  @inject(TYPE.ParadaProgramadaService)
  private readonly paradaProgramadaService: ParadaProgramadaService
}
