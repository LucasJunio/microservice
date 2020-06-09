import { Response } from 'express'
import { inject } from 'inversify'
import { controller, response, interfaces, httpPost, requestBody, httpGet, requestParam } from 'inversify-express-utils'

import { TYPE } from '../../../constants/types'
import Handlers from '../../../core/handlers'
import { ParamsService } from './paramsService'

@controller('/api/v1/params')
export class ParamsController implements interfaces.Controller {
  @inject(TYPE.ParamsService)
  private readonly paramsService: ParamsService

  @httpPost('/')
  public async postParams(@response() res: Response, @requestBody() params: any): Promise<Response> {
    try {
      const data = await this.paramsService.saveParams(params)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/:id')
  public async getParams(@response() res: Response, @requestParam('id') id: number): Promise<Response> {
    try {
      const data = await this.paramsService.getParams(id)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
}
