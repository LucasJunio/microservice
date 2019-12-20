import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpGet, httpPost, response, requestParam, interfaces, requestBody } from 'inversify-express-utils'
import { TYPE } from '../../../constants/types'
import Handlers from '../../../core/Handlers'
import { UnidadeGeradoraService } from './unidadeGeradoraService'

@controller('/api/v1/unidade_geradora')
export class UsinaController implements interfaces.Controller {
  @inject(TYPE.UnidadeGeradoraService)
  private readonly unidadeGeradoraService: UnidadeGeradoraService

  @httpGet('/:cdUsina')
  public async getUnidadesGeradoras(
    @response() res: Response,
    @requestParam('cdUsina') cdUsina: number
  ): Promise<Response> {
    try {
      const data = await this.unidadeGeradoraService.getUnidadesGeradoras(cdUsina)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
}
