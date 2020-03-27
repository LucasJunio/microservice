import { inject, injectable } from 'inversify'
import { getConnection } from 'typeorm'
import { SauClassificacaoParadaRepository } from '../../../repositories/sauClassificacaoParadaRepository'
import { SAU_CLASSIFICACAO_PARADA } from '../../../entities/SAU_CLASSIFICACAO_PARADA'
import { TYPE } from '../../../constants/types'
import { SAU_PARAM_PROGRAMACAO_PARADAS } from '../../../entities/SAU_PARAM_PROGRAMACAO_PARADAS'
import { SauParamProgramacaoParadaRepository } from '../../../repositories/sauParamProgramacaoParadaRepository'
import { SauConsultaPpRepository } from '../../../repositories/sauConsultaPpRepository'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauPgiRepository } from '../../../repositories/sauPgiRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'
import { SauSubClassificacaoParadaRepository } from '../../../repositories/sauSubclassificacaoParadaRepository'
import { SauProgramacaoParadaUgRepository } from '../../../repositories/sauProgramacaoParadaUgRepository'
import { SAU_ITEM_LOOKUP } from '../../../entities/SAU_ITEM_LOOKUP'
import { SAU_PGI } from '../../../entities/SAU_PGI'
import { SAU_SUBCLASSIFICACAO_PARADA } from '../../../entities/SAU_SUBCLASSIFICACAO_PARADA'
import { SAU_PROGRAMACAO_PARADA } from '../../../entities/SAU_PROGRAMACAO_PARADA'
import { PpConsultaDto } from '../../../entities/PpConsultaDto'
import { SAU_CONSULTA_PP_V } from '../../../entities/SAU_CONSULTA_PP_V'
import { SAU_HIST_PROGRAMACAO_PARADA } from '../../../entities/SAU_HIST_PROGRAMACAO_PARADA'
import { SAU_PROGRAMACAO_PARADA_UG } from '../../../entities/SAU_PROGRAMACAO_PARADA_UG'

import { fromUnixTime } from 'date-fns'
import { get, some, filter, map } from 'lodash'

export interface IParadaProgramadaService {
  getClassificacoesParada(sgUsina: string): Promise<SAU_CLASSIFICACAO_PARADA[]>
  getParamProgramacaoParada(year: string): Promise<SAU_PARAM_PROGRAMACAO_PARADAS>
  getNroAnosParadaLongoPrazo(): Promise<SAU_PARAM_PROGRAMACAO_PARADAS[]>
  getItemLookUpByIdLookup(idLookup: number): Promise<SAU_ITEM_LOOKUP[]>
  getPgi(numPgi: string): Promise<SAU_PGI>
  getNumPGI(numParada: number): Promise<SAU_PGI>
  savePgi(pgi: SAU_PGI): Promise<SAU_PGI>
  getSubClassificacaoParada(cdClassificacao: number, idTipoUsina: string): Promise<SAU_SUBCLASSIFICACAO_PARADA[]>
  saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA>
  getById(id: number): Promise<SAU_PROGRAMACAO_PARADA>
  getAll(): Promise<SAU_PROGRAMACAO_PARADA[]>
  // getLastIdSeqParada(cdParada: number): Promise<SAU_PROGRAMACAO_PARADA[]>
  getLastIdParada(): Promise<SAU_PROGRAMACAO_PARADA[]>
  getDocumentos(filtros: PpConsultaDto): Promise<SAU_CONSULTA_PP_V[]>
  getCountDocumentos(filtros: PpConsultaDto): Promise<number>
}

@injectable()
export class ParadaProgramadaService implements IParadaProgramadaService {
  @inject(TYPE.SauClassificacaoParadaRepository)
  private readonly sauClassificacaoParadaRepository: SauClassificacaoParadaRepository

  @inject(TYPE.SauItemLookUpRepository)
  private readonly sauItemLookUpRepository: SauItemLookUpRepository

  @inject(TYPE.SauPgiRepository)
  private readonly sauPgiRepository: SauPgiRepository

  @inject(TYPE.SauProgramacaoParadaRepository)
  private readonly sauProgramacaoParadaRepository: SauProgramacaoParadaRepository

  @inject(TYPE.SauSubClassificacaoParadaRepository)
  private readonly sauSubClassificacaoParadaRepository: SauSubClassificacaoParadaRepository

  @inject(TYPE.SauParamProgramacaoParadaRepository)
  private readonly sauParamProgramacaoParadaRepository: SauParamProgramacaoParadaRepository

  @inject(TYPE.SauConsultaPpRepository)
  private readonly sauConsultaPpRepository: SauConsultaPpRepository

  @inject(TYPE.SauHistProgramacaoParadaRepository)
  private readonly sauHistProgramacaoParadaRepository: SauHistProgramacaoParadaRepository

  @inject(TYPE.SauProgramacaoParadaUgRepository)
  private readonly sauProgramacaoParadaUgRepository: SauProgramacaoParadaUgRepository

  public getClassificacoesParada(sgUsina: string): Promise<SAU_CLASSIFICACAO_PARADA[]> {
    return this.sauClassificacaoParadaRepository.getClassificacoesParada(sgUsina)
  }

  public getParamProgramacaoParada(year: string): Promise<SAU_PARAM_PROGRAMACAO_PARADAS> {
    return this.sauParamProgramacaoParadaRepository.getParamProgramacaoParada(year)
  }

  public getNroAnosParadaLongoPrazo(): Promise<SAU_PARAM_PROGRAMACAO_PARADAS[]> {
    return this.sauParamProgramacaoParadaRepository.getNroAnosParadaLongoPrazo()
  }

  public getItemLookUpByIdLookup(idLookup: number): Promise<SAU_ITEM_LOOKUP[]> {
    return this.sauItemLookUpRepository.getItemLookUpByIdLookup(idLookup)
  }

  public async getTipoParadaByDate(dateFrom: number, dateTo: number): Promise<SAU_ITEM_LOOKUP> {
    const datef = fromUnixTime(dateFrom)
    const datet = fromUnixTime(dateTo)
    return this.sauItemLookUpRepository.getTipoParadaByDate(datef, datet)
  }

  public getPgi(numPgi: string): Promise<SAU_PGI> {
    return this.sauPgiRepository.getPgi(numPgi)
  }

  public getNumPGI(numParada: number): Promise<SAU_PGI> {
    return this.sauPgiRepository.getNumPGI(numParada)
  }

  public savePgi(pgi: SAU_PGI): Promise<SAU_PGI> {
    return this.sauPgiRepository.savePgi(pgi)
  }

  public getHistoricoById(id: number): Promise<SAU_HIST_PROGRAMACAO_PARADA[]> {
    return this.sauHistProgramacaoParadaRepository.findHistoricoById(id)
  }

  public async deleteParadaById(cdPp: number): Promise<any> {
    await getConnection().transaction(async manager => {
      const histRepository = manager.getCustomRepository(SauHistProgramacaoParadaRepository)
      const progParadaRepository = manager.getCustomRepository(SauProgramacaoParadaRepository)
      const progParadaUg = manager.getCustomRepository(SauProgramacaoParadaUgRepository)

      const parada = await progParadaRepository.getById(cdPp)

      await histRepository.sauHistProgramacaoParadaRepository.delete({ cdProgramacaoParada: parada })

      await progParadaUg.sauProgramacaoParadaUg.delete({ cdProgramacaoParada: parada })

      await progParadaRepository.sauProgramacaoParadaRepository.delete({ CD_PROGRAMACAO_PARADA: cdPp })
    })

    return true
  }

  public async back_program(parada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    await getConnection().transaction(async manager => {
      const histRepository = manager.getCustomRepository(SauHistProgramacaoParadaRepository)
      const progParadaRepository = manager.getCustomRepository(SauProgramacaoParadaRepository)

      const statusAprov = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('APRV', 13)

      if (parada.ID_STATUS_PROGRAMACAO === 'C') {
        if (parada.NR_REPROGRAMACOES_APROVADAS !== 0) {
          parada.ID_STATUS_PROGRAMACAO = 'R'
          parada.idStatusReprogramacao = statusAprov
        } else {
          parada.ID_STATUS_PROGRAMACAO = 'P'
          parada.idStatus = statusAprov
          parada.idStatusReprogramacao = null
        }
      }

      if (parada.ID_STATUS_PROGRAMACAO === 'R') {
        if (parada.NR_REPROGRAMACOES_APROVADAS !== 0) {
          parada.ID_STATUS_PROGRAMACAO = 'R'
          parada.idStatusReprogramacao = statusAprov
        } else {
          parada.ID_STATUS_PROGRAMACAO = 'P'
          parada.idStatus = statusAprov
          parada.idStatusReprogramacao = null
        }
      }

      await histRepository.sauHistProgramacaoParadaRepository.delete({
        cdProgramacaoParada: parada,
        FLOW: 'C'
      })
      delete parada.sauProgramacaoParadaUgs
      await progParadaRepository.saveProgramacaoParada(parada)
    })

    return this.getById(parada.CD_PROGRAMACAO_PARADA)
  }

  public async cancel(parada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    parada.ID_STATUS_PROGRAMACAO = 'C'
    const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'EM ANÁLISE USINA',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE
    )
    parada.DT_CANCELAMENTO = new Date()
    parada.CD_USUARIO_CANCELAMENTO = parada.USER_UPDATE
    parada.idStatusCancelamento = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('AAPRV_USINA', 13)
    parada.NM_AREA_ORIGEM_CANCELAMENTO = 'VERIFICAR'
    parada.CD_USUARIO_CANCELAMENTO = 'EDISON'

    await this.saveProgramacaoParada(parada)
    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico)
    return this.getById(parada.CD_PROGRAMACAO_PARADA)
  }

  public getSubClassificacaoParada(
    cdClassificacao: number,
    idTipoUsina: string
  ): Promise<SAU_SUBCLASSIFICACAO_PARADA[]> {
    return this.sauSubClassificacaoParadaRepository.getSubClassificacaoParada(cdClassificacao, idTipoUsina)
  }

  public async saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    let saveHistorico = false
    if (!programcaoParada.CD_PROGRAMACAO_PARADA) {
      saveHistorico = true
    }

    const parada = await this.createAndSavePp(programcaoParada)

    const paradaWithCdParada = new SAU_PROGRAMACAO_PARADA()
    paradaWithCdParada.CD_PROGRAMACAO_PARADA = get(parada, ['CD_PROGRAMACAO_PARADA'])

    const listUgs = this.createListOfUgs(programcaoParada.sauProgramacaoParadaUgs, paradaWithCdParada)
    await this.sauProgramacaoParadaUgRepository.saveProgramacaoParadaUgLote(listUgs)

    const paradaRet = await this.getById(parada.CD_PROGRAMACAO_PARADA)

    if (!saveHistorico) {
      return paradaRet
    }

    const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'RASCUNHO',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE,
      `O documento foi criado com status RASCUNHO`
    )
    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico)

    return paradaRet
  }

  public async getById(id: number): Promise<SAU_PROGRAMACAO_PARADA> {
    const pp = await this.sauProgramacaoParadaRepository.getById(id)
    return pp
  }

  public getAll(): Promise<SAU_PROGRAMACAO_PARADA[]> {
    return this.sauProgramacaoParadaRepository.getAll()
  }

  public getLastIdParada(): Promise<SAU_PROGRAMACAO_PARADA[]> {
    return this.sauProgramacaoParadaRepository.getLastIdParada()
  }

  public async getDocumentos(filtros: PpConsultaDto): Promise<SAU_CONSULTA_PP_V[]> {
    return this.sauConsultaPpRepository.getDocumentos(filtros)
  }

  public async getCountDocumentos(filtros: PpConsultaDto): Promise<number> {
    return this.sauConsultaPpRepository.getCountDocumentos(filtros)
  }

  public async getAllNumPgi(): Promise<SAU_PGI[]> {
    return this.sauPgiRepository.getAllNumPgi()
  }

  private async createAndSavePp(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    if (programcaoParada.CD_PROGRAMACAO_PARADA) {
      await this.sauProgramacaoParadaUgRepository.deleteAllPpUgByCdParada(programcaoParada.CD_PROGRAMACAO_PARADA)
      return this.sauProgramacaoParadaRepository.saveProgramacaoParada(programcaoParada)
    }

    const idParada = await this.sauProgramacaoParadaRepository.getLastIdParada()
    programcaoParada.CD_PARADA = idParada[0].ID // sempre o proximo
    programcaoParada.ID_STATUS_PROGRAMACAO = 'P'
    programcaoParada.USER_CREATE = programcaoParada.USER_UPDATE
    programcaoParada.DATE_CREATE = programcaoParada.DATE_UPDATE

    return this.sauProgramacaoParadaRepository.saveProgramacaoParada(programcaoParada)
  }

  private createListOfUgs(unidadesGeradoras: any, parada: SAU_PROGRAMACAO_PARADA): any[] {
    const list = []
    for (const unidadesGeradora of unidadesGeradoras) {
      const newUg = new SAU_PROGRAMACAO_PARADA_UG()
      newUg.cdUnidadeGeradora = unidadesGeradora
      newUg.DATE_CREATE = new Date()
      newUg.cdProgramacaoParada = parada
      list.push(newUg)
      // falta informaçes aqui
    }
    return list
  }
}
