import { Response } from 'express'
import { inject } from 'inversify'
import { controller, response, interfaces, httpPost, requestBody, requestHeaders } from 'inversify-express-utils'
import { TYPE } from '../../../constants/types'
import Handlers from '../../../core/handlers'
import { CheckVersionPPReproExclu } from '../../../middleware/versionMiddleware'
import { ReprogramacaoParadaService } from './reprogramacaoParadaService'

@controller('/api/v1/reprogramacao')
export class ReprogramacaoParadaController implements interfaces.Controller {
  @inject(TYPE.ReprogramacaoParadaService)
  private readonly reprogramacaoParadaService: ReprogramacaoParadaService

  @httpPost('/', CheckVersionPPReproExclu)
  public async getUsinas(
    @response() res: Response,
    @requestBody() repro: any,
    @requestHeaders('authorization') authorization: string
  ): Promise<Response> {
    try {
      const data = await this.reprogramacaoParadaService.saveReprogramacaoParada(repro, authorization)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
}
