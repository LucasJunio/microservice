import { inject } from 'inversify'
import { controller, interfaces } from 'inversify-express-utils'
import { TYPE } from '../../../constants/types'
import { ParadaProgramadaService } from './paradaProgramadaService'

@controller('/api/v1/parada_programada')
export class ParadaProgramadaServiceController implements interfaces.Controller {
  @inject(TYPE.ParadaProgramadaService)
  private readonly paradaProgramadaService: ParadaProgramadaService
}
