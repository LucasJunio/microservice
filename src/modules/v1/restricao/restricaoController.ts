import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPost, response, interfaces, httpGet, requestParam, requestBody } from 'inversify-express-utils'
import { TYPE } from '../../../constants/types'
import Handlers from '../../../core/handlers'
import { RestricaoService } from './restricaoService'

@controller('/api/v1/restricao')
export class RestricaoController implements interfaces.Controller {
  @inject(TYPE.RestricaoService)
  private readonly restricaoService: RestricaoService

  @httpGet('/:cdUsina')
  public async getRestricaoByUsina(
    @response() res: Response,
    @requestParam('cdUsina') cdUsina: number
  ): Promise<Response> {
    try {
      const data = await this.restricaoService.getRestricoesByUsina(cdUsina)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpPost('/conflictingpp')
  public async getConflictingPp(@response() res: Response, @requestBody() body: any): Promise<Response> {
    try {
      const data = await this.restricaoService.getConflictingPp(body)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
}
