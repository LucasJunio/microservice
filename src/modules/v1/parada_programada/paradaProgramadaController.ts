import { Response } from 'express'
import { inject } from 'inversify'
import { controller, interfaces, httpGet, response, requestParam, httpPost, requestBody } from 'inversify-express-utils'
import { TYPE } from '../../../constants/types'
import { ParadaProgramadaService } from './paradaProgramadaService'
import Handlers from '../../../core/Handlers'

@controller('/api/v1/parada_programada')
export class ParadaProgramadaServiceController implements interfaces.Controller {
  @inject(TYPE.ParadaProgramadaService)
  private readonly paradaProgramadaService: ParadaProgramadaService

  @httpGet('/tipo_parada')
  public async getTipoParada(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getItemLookUpByIdLookup('TIPO_PARADA')
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/status_parada')
  public async getStatusParada(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getItemLookUpByIdLookup('STATUS_PROG_PARADA')
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/motivo_reprogramacao')
  public async getMotivoReprogramacao(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getItemLookUpByIdLookup('MOTIVO_REPROG_PARADA')
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/classificacao_parada/:sgUsina')
  public async getClassificacaoParada(
    @response() res: Response,
    @requestParam('sgUsina') sgUsina: string
  ): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getClassificacoesParada(sgUsina)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/sub_classificacao_parada/:cdClassificacao/:idTipoUsina')
  public async getSubClassificacaoParada(
    @response() res: Response,
    @requestParam('cdClassificacao') cdClassificacao: number,
    @requestParam('idTipoUsina') idTipoUsina: string
  ): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getSubClassificacaoParada(cdClassificacao, idTipoUsina)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/param_programacao_paradas/:year')
  public async getParamProgramacaoParada(
    @response() res: Response,
    @requestParam('year') year: string
  ): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getParamProgramacaoParada(year)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/nro_anos_parada_longo_prazo')
  public async getNroAnosParadaLongoPrazo(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getNroAnosParadaLongoPrazo()
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/')
  public async getAll(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getAll()
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpPost('/')
  public async saveProgramacaoParada(@response() res: Response, @requestBody() parada: any): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.saveProgramacaoParada(parada)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/id/:id')
  public async getById(@response() res: Response, @requestParam('id') id: number): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getById(id)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/situacao')
  public async getSituacao(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getItemLookUpByIdLookup('SITUACAO_PROG_PARADA')
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/num_pgi/:numParada')
  public async getNumPgi(@response() res: Response, @requestParam('numParada') numParada: number): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getNumPGI(numParada)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/id_parada_seq/:numParada')
  public async getLastIdSeqParada(
    @response() res: Response,
    @requestParam('numParada') numParada: number
  ): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getLastIdSeqParada(numParada)
      return Handlers.onSuccess(res, data[0])
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/id_parada')
  public async getLastIdParada(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getLastIdParada()
      return Handlers.onSuccess(res, data[0])
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }
}
