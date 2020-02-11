import { Response } from 'express'
import { inject } from 'inversify'
import { controller, interfaces, httpGet, httpPut, response, requestParam, httpPost, requestBody } from 'inversify-express-utils'
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
      const data = await this.paradaProgramadaService.getItemLookUpByIdLookup(11)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/status')
  public async getStatus(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getItemLookUpByIdLookup(13)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/status_parada')
  public async getStatusParada(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getItemLookUpByIdLookup(14)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/motivo_reprogramacao')
  public async getMotivoReprogramacao(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getItemLookUpByIdLookup(16)
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
      return Handlers.onSuccess(res, data[0])
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

  @httpPut('/next_level')
  public async nextLevel(@response() res: Response, @requestBody() parada: any): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.nextLevel(parada)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpPut('/prev_level')
  public async prevLevel(@response() res: Response, @requestBody() parada: any): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.prevLevel(parada)
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/situacao')
  public async getSituacao(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getItemLookUpByIdLookup(12)
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

  @httpPost('/documentos')
  public async getDocumentos(@response() res: Response, @requestBody() filtros: any): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getDocumentos(filtros)
      const count = await this.paradaProgramadaService.getCountDocumentos(filtros)
      return Handlers.onSuccess(res, { data, count })
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/all_num_pgi')
  public async getNumPgo(@response() res: Response): Promise<Response> {
    try {
      const data = await this.paradaProgramadaService.getAllNumPgi()
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

  @httpGet('/historico/:id')
  public async getHistorico(@response() res: Response, @requestParam('id') numParada: number ): Promise<Response> {
    try {
      const hist = await this.paradaProgramadaService.getHistoricoById(numParada);
      return Handlers.onSuccess(res, hist)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

}
