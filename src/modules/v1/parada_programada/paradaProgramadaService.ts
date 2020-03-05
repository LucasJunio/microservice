import { inject, injectable } from 'inversify'
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

import {
  setYear,
  fromUnixTime,
  differenceInHours,
  isAfter,
  isSameYear,
  isBefore,
  addYears,
  differenceInYears
} from 'date-fns'
import { get } from 'lodash'

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
    const currentYear = new Date().getFullYear()
    const achorDate = setYear(new Date(2015, 7, 31), currentYear) // 31-08-currentYear

    const difference = differenceInHours(datet, datef)

    if (difference < 24) {
      // Diferença < 24 horas intempestiva
      return this.sauItemLookUpRepository.getItemLookUpByCdAndId('PI', 11)
    }

    if (difference < 48) {
      // Diferença < 48 horas intempestiva
      return this.sauItemLookUpRepository.getItemLookUpByCdAndId('PU', 11)
    }

    // caso datef ser antes de 31/08, datef e datet mesmo ano || caso datef ser depois de 31/08 datet tem que ser ano de datef +1
    if (
      (isBefore(datef, achorDate) && isSameYear(datef, datet)) ||
      (isAfter(datef, achorDate) && isSameYear(datet, addYears(datef, 1)))
    ) {
      return this.sauItemLookUpRepository.getItemLookUpByCdAndId('PP', 11)
    }

    // caso datef ser antes de 30/08 e datet for o ano de datef + 1
    if (isBefore(datef, achorDate) && isSameYear(datet, addYears(datef, 1))) {
      return this.sauItemLookUpRepository.getItemLookUpByCdAndId('PA', 11)
    }

    if (differenceInYears(datet, datef) <= 2) {
      return this.sauItemLookUpRepository.getItemLookUpByCdAndId('PB', 11)
    }

    return this.sauItemLookUpRepository.getItemLookUpByCdAndId('PL', 11)
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
      parada.USER_UPDATE
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
    programcaoParada.CD_PARADA = idParada[0].CD_PARADA + 1 // sempre o proximo
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
