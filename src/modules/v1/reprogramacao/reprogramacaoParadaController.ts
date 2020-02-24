import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPut, response, interfaces, httpPost, requestBody } from 'inversify-express-utils'
import { TYPE } from '../../../constants/types'
import Handlers from '../../../core/Handlers'
import { ReprogramacaoParadaService } from './reprogramacaoParadaService'

@controller('/api/v1/reprogramacao')
export class ReprogramacaoParadaController implements interfaces.Controller {
    @inject(TYPE.ReprogramacaoParadaService)
    private readonly reprogramacaoParadaService: ReprogramacaoParadaService
    
    @httpPost('/')
    public async getUsinas(@response() res: Response, @requestBody() repro: any): Promise<Response> {
        try {
        const data = await this.reprogramacaoParadaService.saveReprogramacaoParada(repro);
        return Handlers.onSuccess(res, data)
        } catch (error) {
        return Handlers.onError(res, error.message, error)
        }
    }
}
