import { inject, injectable } from 'inversify'
import { getConnection } from 'typeorm'
import { SauClassificacaoParadaRepository } from '../../../repositories/sauClassificacaoParadaRepository'
import { ClassificacaoParada } from '../../../entities/classificacaoParada'
import { TYPE } from '../../../constants/types'
import { ParamProgramacaoParadas } from '../../../entities/paramProgramacaoParadas'
import { SauParamProgramacaoParadaRepository } from '../../../repositories/sauParamProgramacaoParadaRepository'
import { SauConsultaPpRepository } from '../../../repositories/sauConsultaPpRepository'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauPgiRepository } from '../../../repositories/sauPgiRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'
import { SauSubClassificacaoParadaRepository } from '../../../repositories/sauSubclassificacaoParadaRepository'
import { SauProgramacaoParadaUgRepository } from '../../../repositories/sauProgramacaoParadaUgRepository'
import { TemLookup } from '../../../entities/temLookup'
import { Pgi } from '../../../entities/pgi'
import { SubclassificacaoParada } from '../../../entities/subclassificacaoParada'
import { ProgramacaoParada } from '../../../entities/programacaoParada'
import { PpConsultaDto } from '../../../entities/ppConsultaDto'
import { ConsultaPPV } from '../../../entities/consultaPPV'
import { HistProgramacaoParada } from '../../../entities/histProgramacaoParada'
import { ProgramacaoParadaUG } from '../../../entities/programacaoParadaUG'
import promiseTimeout from '../../../util/promiseTimeout'
import { AuthService, FluxoService } from '../../../constants/services'
import { Usina } from '../../../entities/usina'
import * as moment from 'moment'
import fetch from 'node-fetch'

import { parseISO } from 'date-fns'
import { get } from 'lodash'

export interface IParadaProgramadaService {
  getClassificacoesParada(sgUsina: string): Promise<ClassificacaoParada[]>
  getParamProgramacaoParada(year: string): Promise<ParamProgramacaoParadas>
  getNroAnosParadaLongoPrazo(): Promise<ParamProgramacaoParadas[]>
  getItemLookUpByIdLookup(idLookup: string): Promise<TemLookup[]>
  getPgi(numPgi: string): Promise<Pgi>
  getNumPGI(numParada: number): Promise<Pgi>
  savePgi(pgi: Pgi): Promise<Pgi>
  getSubClassificacaoParada(cdClassificacao: number, idTipoUsina: string): Promise<SubclassificacaoParada[]>
  saveProgramacaoParada(programcaoParada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
  getById(id: number): Promise<ProgramacaoParada>
  getAll(): Promise<ProgramacaoParada[]>
  // getLastIdSeqParada(cdParada: number): Promise<ProgramacaoParada[]>
  getLastIdParada(): Promise<ProgramacaoParada[]>
  getDocumentos(filtros: PpConsultaDto): Promise<ConsultaPPV[]>
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

  public getClassificacoesParada(sgUsina: string): Promise<ClassificacaoParada[]> {
    return this.sauClassificacaoParadaRepository.getClassificacoesParada(sgUsina)
  }

  public getParamProgramacaoParada(year: string): Promise<ParamProgramacaoParadas> {
    return this.sauParamProgramacaoParadaRepository.getParamProgramacaoParada(year)
  }

  public getNroAnosParadaLongoPrazo(): Promise<ParamProgramacaoParadas[]> {
    return this.sauParamProgramacaoParadaRepository.getNroAnosParadaLongoPrazo()
  }

  public getItemLookUpByIdLookup(idLookup: string): Promise<TemLookup[]> {
    return this.sauItemLookUpRepository.getItemLookUpByIdLookup(idLookup)
  }

  public async getTipoParadaByDate(dateFrom: string, dateTo: string): Promise<TemLookup> {
    return this.sauItemLookUpRepository.getTipoParadaByDate(parseISO(dateFrom), parseISO(dateTo))
  }

  public getPgi(numPgi: string): Promise<Pgi> {
    return this.sauPgiRepository.getPgi(numPgi)
  }

  public getNumPGI(numParada: number): Promise<Pgi> {
    return this.sauPgiRepository.getNumPGI(numParada)
  }

  public savePgi(pgi: Pgi): Promise<Pgi> {
    return this.sauPgiRepository.savePgi(pgi)
  }

  public getHistoricoById(id: number): Promise<HistProgramacaoParada[]> {
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

  public async back_program(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    await getConnection().transaction(async manager => {
      const histRepository = manager.getCustomRepository(SauHistProgramacaoParadaRepository)
      const progParadaRepository = manager.getCustomRepository(SauProgramacaoParadaRepository)

      const statusAprov = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('APRV', 13)

      const from = parada.ID_STATUS_PROGRAMACAO

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

      const historico = histRepository.createDefaultHistorico(
        parada,
        'DEVOLVIDO',
        from,
        parada.USER_UPDATE,
        `O documento foi devolvido para o fluxo de ${
          parada.ID_STATUS_PROGRAMACAO === 'P' ? 'PROGRAMAÇÃO' : 'REPROGRAMAÇÃO'
        }`
      )

      await histRepository.saveHistoricoPp(historico, authorization)

      delete parada.sauProgramacaoParadaUgs
      await progParadaRepository.saveProgramacaoParada(parada)
    })

    return this.getById(parada.CD_PROGRAMACAO_PARADA)
  }

  public async cancel(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    parada.ID_STATUS_PROGRAMACAO = 'C'
    const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'EM ANÁLISE USINA',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE
    )
    parada.DT_CANCELAMENTO = parada.DATE_UPDATE
    parada.CD_USUARIO_CANCELAMENTO = parada.USER_UPDATE
    parada.idStatusCancelamento = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('AAPRV_USINA', 13)
    parada.NM_AREA_ORIGEM_CANCELAMENTO = null
    parada.CD_USUARIO_CANCELAMENTO = parada.USER_UPDATE

    await this.saveProgramacaoParada(parada, authorization)
    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    return this.getById(parada.CD_PROGRAMACAO_PARADA)
  }

  public async getSubClassificacaoParada(
    cdClassificacao: number,
    idTipoUsina: string
  ): Promise<SubclassificacaoParada[]> {
    // const cdAplicacaoUsina = await this.sauItemLookUpRepository.getItemLookUpByCdAndId(idTipoUsina, 19)
    return this.sauSubClassificacaoParadaRepository.getSubClassificacaoParada(cdClassificacao, idTipoUsina)
  }

  public async saveProgramacaoParada(
    programcaoParada: ProgramacaoParada,
    authorization: string
  ): Promise<ProgramacaoParada> {
    let saveHistorico = false
    let previus
    if (!programcaoParada.CD_PROGRAMACAO_PARADA) {
      saveHistorico = true
    } else {
      previus = await this.sauProgramacaoParadaRepository.getById(programcaoParada.CD_PROGRAMACAO_PARADA)
    }

    const parada = await this.createAndSavePp(programcaoParada)

    const paradaWithCdParada = new ProgramacaoParada()
    paradaWithCdParada.CD_PROGRAMACAO_PARADA = get(parada, ['CD_PROGRAMACAO_PARADA'])

    const listUgs = this.createListOfUgs(programcaoParada.sauProgramacaoParadaUgs, paradaWithCdParada)
    await this.sauProgramacaoParadaUgRepository.saveProgramacaoParadaUgLote(listUgs)

    const paradaRet = await this.getById(parada.CD_PROGRAMACAO_PARADA)

    this.fluxoNotificacao(previus, paradaRet, authorization)

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

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)

    return paradaRet
  }

  public async fluxoNotificacao(
    previus: ProgramacaoParada,
    atual: ProgramacaoParada,
    authorization: string
  ): Promise<void> {
    if (!atual || !authorization) {
      return
    }
    const [usina] = await this.sauProgramacaoParadaRepository.getUsinaByCdAndId(
      atual.CD_CONJUNTO_USINA,
      atual.ID_CONJUNTO_USINA
    )
    const userUpdate = await this.getUsuario(atual.USER_UPDATE, authorization)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: authorization
    }
    const body = JSON.stringify({
      sgSistema: 'SAU',
      cdTela: 'SAU3100',
      aplicacoes: [usina.SG_CONJUNTO_USINA],
      link: `/pp/documento/${atual.CD_PROGRAMACAO_PARADA}`,
      variaveis: this.getVariaveisPp(atual, usina, userUpdate),
      ...this.getTipo(atual),
      ...this.getStatusDe(previus, atual),
      ...this.getStatusPara(atual)
    })
    try {
      await promiseTimeout(3000, fetch(FluxoService.URL, { method: 'POST', headers, body }))
      // console.log({ body })
    } catch (error) {
      // console.log(`Erro ao invocar o fluxo: ${error}`)
    }
  }

  public async getById(id: number): Promise<ProgramacaoParada> {
    const pp = await this.sauProgramacaoParadaRepository.getById(id)
    return pp
  }

  public getAll(): Promise<ProgramacaoParada[]> {
    return this.sauProgramacaoParadaRepository.getAll()
  }

  public getLastIdParada(): Promise<ProgramacaoParada[]> {
    return this.sauProgramacaoParadaRepository.getLastIdParada()
  }

  public async getDocumentos(filtros: PpConsultaDto): Promise<ConsultaPPV[]> {
    return this.sauConsultaPpRepository.getDocumentos(filtros)
  }

  public async getCountDocumentos(filtros: PpConsultaDto): Promise<number> {
    return this.sauConsultaPpRepository.getCountDocumentos(filtros)
  }

  public async getAllNumPgi(): Promise<Pgi[]> {
    return this.sauPgiRepository.getAllNumPgi()
  }

  private async getUsuario(cdUsuario: string, authorization: string): Promise<any> {
    if (!cdUsuario) {
      return null
    }
    const headers = {
      'Content-Type': 'application/json',
      Authorization: authorization
    }
    try {
      const usuario = await promiseTimeout(
        3000,
        fetch(`${AuthService.URL_LOAD_USUARIO}${cdUsuario}`, { method: 'GET', headers })
      )
      return usuario.json()
    } catch (e) {
      return null
    }
  }

  private getVariaveisPp(pp: ProgramacaoParada, usina, userUpdate): any {
    return {
      CLASSIFICACAO: pp.cdClassificacaoProgrParada ? pp.cdClassificacaoProgrParada.DS_CLASSIFICACAO_PARADA : '',
      DES_MOTIVO: pp.DS_MOTIVO_REPROGRAMACAO || '',
      DES_PARADA: pp.DS_PROGRAMACAO_PARADA || '',
      DS_SERVICO: pp.DS_SERVICO_EXECUTADO || '',
      DT_CANCELAMENTO: pp.DT_CANCELAMENTO ? moment(pp.DT_CANCELAMENTO).format('DD/MM/YYYY HH:mm') : '',
      DT_FIM_PROG: pp.DT_HORA_TERMINO_PROGRAMACAO
        ? moment(pp.DT_HORA_TERMINO_PROGRAMACAO).format('DD/MM/YYYY HH:mm')
        : '',
      DT_FIM_REPROG: pp.DT_HORA_TERMINO_REPROGRAMACAO
        ? moment(pp.DT_HORA_TERMINO_REPROGRAMACAO).format('DD/MM/YYYY HH:mm')
        : '',
      DT_FIM_SERVICO: pp.DT_HORA_TERMINO_SERVICO ? moment(pp.DT_HORA_TERMINO_SERVICO).format('DD/MM/YYYY HH:mm') : '',
      DT_INICIO_PROG: pp.DT_HORA_INICIO_PROGRAMACAO
        ? moment(pp.DT_HORA_INICIO_PROGRAMACAO).format('DD/MM/YYYY HH:mm')
        : '',
      DT_INICIO_REPROG: pp.DT_HORA_INICIO_REPROGRAMACAO
        ? moment(pp.DT_HORA_INICIO_REPROGRAMACAO).format('DD/MM/YYYY HH:mm')
        : '',
      DT_INICIO_SERVICO: pp.DT_HORA_INICIO_SERVICO ? moment(pp.DT_HORA_INICIO_SERVICO).format('DD/MM/YYYY HH:mm') : '',
      MOTIVO_CANCELAMENTO: pp.DS_MOTIVO_CANCELAMENTO || '',
      MOTIVO_REPROG: pp.idMotivoReprogramacao ? pp.idMotivoReprogramacao.DS_ITEM_LOOKUP : '',
      NM_AREA_ORIGEM: pp.NM_AREA_ORIGEM || '',
      NM_AREA_ORIGEM_CANCEL: pp.NM_AREA_ORIGEM_CANCELAMENTO || '',
      NM_AREA_ORIGEM_REPROG: pp.NM_AREA_ORIGEM_REPROGRAMACAO || '',
      NUM_PARADA: pp.CD_PROGRAMACAO_PARADA || '',
      NUM_PGI: pp.sauPgis && pp.sauPgis.length ? pp.sauPgis[0].NUM_PGI : '',
      ORIGEM_REPROG: pp.idOrigemReprogramacao ? pp.idOrigemReprogramacao.DS_ITEM_LOOKUP : '',
      TIPO: pp.idTipoParada ? pp.idTipoParada.DS_ITEM_LOOKUP : '',
      TIPO_PROG: pp.idTipoProgramacao ? pp.idTipoProgramacao.DS_ITEM_LOOKUP : '',
      UG: pp.sauProgramacaoParadaUgs ? pp.sauProgramacaoParadaUgs[0].cdUnidadeGeradora.SG_UNIDADE_GERADORA : '',
      USINA: usina ? usina.SG_CONJUNTO_USINA : '',
      USUARIO: userUpdate ? userUpdate.NM_USUARIO : ''
    }
  }

  private getTipo(atual: ProgramacaoParada): any {
    const { idTipoParada: idTipoParadaA, ID_STATUS_PROGRAMACAO: ID_STATUS_PROGRAMACAOA } = atual
    const isPa = 'PA-PB-PL'.includes(idTipoParadaA.ID_ITEM_LOOKUP)
    let tipoInformacao
    switch (ID_STATUS_PROGRAMACAOA) {
      case 'R':
        tipoInformacao = `PP-REPROGRAMACAO${isPa ? '_PA-PB-PL' : '_PP-PI-PU'}`
        break
      case 'C':
        tipoInformacao = `PP-CANCELAMENTO${isPa ? '_PA-PB-PL' : '_PP-PI-PU'}`
        break
      default:
        tipoInformacao = `PP-PROGRAMACAO${isPa ? '-PA-PB-PL' : '_PP-PI-PU'}`
    }
    return { tipoInformacao }
  }

  private getStatusDe(previus: ProgramacaoParada, atual: ProgramacaoParada): any {
    if (!previus) {
      return { statusDe: '' }
    }
    const { ID_STATUS_PROGRAMACAO: ID_STATUS_PROGRAMACAOP } = previus
    const { ID_STATUS_PROGRAMACAO: ID_STATUS_PROGRAMACAOA } = atual
    if (ID_STATUS_PROGRAMACAOA !== ID_STATUS_PROGRAMACAOP) {
      return ID_STATUS_PROGRAMACAOA === 'C' || ID_STATUS_PROGRAMACAOA === 'R'
        ? { statusDe: '' }
        : { statusDe: previus.idStatus.ID_ITEM_LOOKUP }
    }
    switch (ID_STATUS_PROGRAMACAOA) {
      case 'R':
        return { statusDe: previus.idStatusReprogramacao.ID_ITEM_LOOKUP }
      case 'C':
        return { statusDe: previus.idStatusCancelamento.ID_ITEM_LOOKUP }
      default:
        return { statusDe: previus.idStatus.ID_ITEM_LOOKUP }
    }
  }

  private getStatusPara(atual: ProgramacaoParada): any {
    switch (atual.ID_STATUS_PROGRAMACAO) {
      case 'R':
        return { statusPara: atual.idStatusReprogramacao.ID_ITEM_LOOKUP }
      case 'C':
        return { statusPara: atual.idStatusCancelamento.ID_ITEM_LOOKUP }
      default:
        return { statusPara: atual.idStatus.ID_ITEM_LOOKUP }
    }
  }

  private async createAndSavePp(programcaoParada: ProgramacaoParada): Promise<ProgramacaoParada> {
    if (programcaoParada.CD_PROGRAMACAO_PARADA) {
      await this.sauProgramacaoParadaUgRepository.deleteAllPpUgByCdParada(programcaoParada.CD_PROGRAMACAO_PARADA)
      return this.sauProgramacaoParadaRepository.saveProgramacaoParada(programcaoParada)
    }

    programcaoParada.ID_STATUS_PROGRAMACAO = 'P'
    programcaoParada.USER_CREATE = programcaoParada.USER_UPDATE
    programcaoParada.DATE_CREATE = programcaoParada.DATE_UPDATE

    return this.sauProgramacaoParadaRepository.saveProgramacaoParada(programcaoParada)
  }

  private createListOfUgs(unidadesGeradoras: any, parada: ProgramacaoParada): any[] {
    const list = []
    for (const unidadesGeradora of unidadesGeradoras) {
      const newUg = new ProgramacaoParadaUG()
      newUg.cdUnidadeGeradora = unidadesGeradora
      newUg.DATE_CREATE = parada.DATE_UPDATE
      newUg.cdProgramacaoParada = parada
      list.push(newUg)
      // falta informaçes aqui
    }
    return list
  }
}
