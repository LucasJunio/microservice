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

import { fromUnixTime, parseISO } from 'date-fns'
import { get, some, filter, map } from 'lodash'

export interface IParadaProgramadaService {
  getClassificacoesParada(sgUsina: string): Promise<ClassificacaoParada[]>
  getParamProgramacaoParada(year: string): Promise<ParamProgramacaoParadas>
  getNroAnosParadaLongoPrazo(): Promise<ParamProgramacaoParadas[]>
  getItemLookUpByIdLookup(idLookup: string): Promise<TemLookup[]>
  getPgi(numPgi: string): Promise<Pgi>
  getNumPGI(numParada: number): Promise<Pgi>
  savePgi(pgi: Pgi): Promise<Pgi>
  getSubClassificacaoParada(cdClassificacao: number, idTipoUsina: string): Promise<SubclassificacaoParada[]>
  saveProgramacaoParada(programcaoParada: ProgramacaoParada): Promise<ProgramacaoParada>
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

  public async back_program(parada: ProgramacaoParada): Promise<ProgramacaoParada> {
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

      await histRepository.saveHistoricoPp(historico)

      delete parada.sauProgramacaoParadaUgs
      await progParadaRepository.saveProgramacaoParada(parada)
    })

    return this.getById(parada.CD_PROGRAMACAO_PARADA)
  }

  public async cancel(parada: ProgramacaoParada): Promise<ProgramacaoParada> {
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

  public async getSubClassificacaoParada(
    cdClassificacao: number,
    idTipoUsina: string
  ): Promise<SubclassificacaoParada[]> {
    // const cdAplicacaoUsina = await this.sauItemLookUpRepository.getItemLookUpByCdAndId(idTipoUsina, 19)
    return this.sauSubClassificacaoParadaRepository.getSubClassificacaoParada(cdClassificacao, idTipoUsina)
  }

  public async saveProgramacaoParada(programcaoParada: ProgramacaoParada): Promise<ProgramacaoParada> {
    let saveHistorico = false
    if (!programcaoParada.CD_PROGRAMACAO_PARADA) {
      saveHistorico = true
    }

    const parada = await this.createAndSavePp(programcaoParada)

    const paradaWithCdParada = new ProgramacaoParada()
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

  private async createAndSavePp(programcaoParada: ProgramacaoParada): Promise<ProgramacaoParada> {
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

  private createListOfUgs(unidadesGeradoras: any, parada: ProgramacaoParada): any[] {
    const list = []
    for (const unidadesGeradora of unidadesGeradoras) {
      const newUg = new ProgramacaoParadaUG()
      newUg.cdUnidadeGeradora = unidadesGeradora
      newUg.DATE_CREATE = new Date()
      newUg.cdProgramacaoParada = parada
      list.push(newUg)
      // falta informaçes aqui
    }
    return list
  }
}
