import { inject, injectable } from 'inversify'
import * as _ from 'lodash'
import * as moment from 'moment'

import { TYPE } from '../../../constants/types'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'

import { ProgramacaoParada } from '../../../entities/programacaoParada'

import { ParadaProgramadaService } from '../parada_programada/paradaProgramadaService'
import { TemLookup } from '../../../entities/temLookup'
import { Pgi } from '../../../entities/pgi'
import { HistProgramacaoParada } from '../../../entities/histProgramacaoParada'
import { ProgramacaoFluxoService } from './programacaoFluxoService'
import { ReprogramacaoFluxoService } from './reprogramacaoFluxoService'
import { CancelamentoFluxoService } from './cancelamentoFluxoService'

export interface IFluxoService {
  nextLevel(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
  prevLevel(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
  getStatus(parada: ProgramacaoParada): TemLookup
  setStatusPp(parada: ProgramacaoParada, status: string): Promise<ProgramacaoParada>
}

@injectable()
export class FluxoService implements IFluxoService {
  // SERVICES
  @inject(TYPE.ParadaProgramadaService)
  private readonly paradaProgramadaService: ParadaProgramadaService

  @inject(TYPE.ProgramacaoFluxoService)
  private readonly programacaoFluxoService: ProgramacaoFluxoService

  @inject(TYPE.ReprogramacaoFluxoService)
  private readonly reprogramacaoFluxoService: ReprogramacaoFluxoService

  @inject(TYPE.CancelamentoFluxoService)
  private readonly cancelamentoFluxoService: CancelamentoFluxoService

  // REPOSITORIES
  @inject(TYPE.SauItemLookUpRepository)
  private readonly sauItemLookUpRepository: SauItemLookUpRepository

  @inject(TYPE.SauProgramacaoParadaRepository)
  private readonly sauProgramacaoParadaRepository: SauProgramacaoParadaRepository

  @inject(TYPE.SauHistProgramacaoParadaRepository)
  private readonly sauHistProgramacaoParadaRepository: SauHistProgramacaoParadaRepository

  public async execNextLevel(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    switch (parada.idStatus.ID_ITEM_LOOKUP) {
      case 'EXECUCAO':
        if (parada.sauPgis.length !== 0) {
          parada.DT_HORA_TERMINO_SERVICO = this.getForwardDate(parada.sauPgis)
          parada.DT_HORA_INICIO_SERVICO = this.getBackwardDate(parada.sauPgis)
        }
        parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
          'STATUS_PROG_PARADA',
          'AAPRV'
        )
        break
      case 'AAPRV':
        parada.DT_CONCLUSAO = parada.DATE_UPDATE
        parada.CD_USUARIO_CONCLUSAO = parada.USER_UPDATE
        parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
          'STATUS_PROG_PARADA',
          'CONCL'
        )
        break
    }

    await this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
    return this.paradaProgramadaService.getById(parada.CD_PROGRAMACAO_PARADA)
  }

  public getForwardDate(pgis: Pgi[]): Date {
    let forward = pgis[0].DT_FIM

    for (const di of pgis) {
      if (moment(di.DT_FIM).isAfter(forward)) {
        forward = di.DT_FIM
      }
    }

    return forward
  }

  public getBackwardDate(pgis: Pgi[]): Date {
    let backward = pgis[0].DT_INICIO

    for (const di of pgis) {
      if (moment(di.DT_INICIO).isBefore(backward)) {
        backward = di.DT_INICIO
      }
    }

    return backward
  }

  public async selectFinalStatus(parada: ProgramacaoParada): Promise<any> {
    let status = null
    let msg = ''

    switch (parada.ID_STATUS_PROGRAMACAO) {
      case 'C':
        parada.idStatusCancelamento = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
          'STATUS_PROG_PARADA',
          'CANC'
        )
        status = 'CANCELADO'
        msg = `O documento foi cancelado`
        parada.DT_CANCELAMENTO = new Date()
        parada.CD_USUARIO_CANCELAMENTO = parada.USER_UPDATE
        break
    }

    return { status, msg }
  }

  public async nextLevel(parada: ProgramacaoParada, authorization: string): Promise<any> {
    const status = this.getStatus(parada)

    if (parada.ID_STATUS_PROGRAMACAO === 'P') {
      switch (status.ID_ITEM_LOOKUP) {
        case 'RASCUNHO':
          return this.programacaoFluxoService.handleRascunho(parada, authorization)
          break
        case 'AAPRV_USINA':
          return this.programacaoFluxoService.handleAgAprUsina(parada, authorization)
          break
        case 'AAPRV_OPE':
          return this.programacaoFluxoService.handleAgAprOpe(parada, authorization)
          break
        case 'APRV':
          return this.programacaoFluxoService.handleAprv(parada, authorization)
          break
        default:
          break
      }
    } else if (parada.ID_STATUS_PROGRAMACAO === 'C') {
      switch (status.ID_ITEM_LOOKUP) {
        case 'AAPRV_USINA':
          return this.cancelamentoFluxoService.handleAgAprUsina(parada, authorization)
          break
        case 'AAPRV_OPE':
          return this.cancelamentoFluxoService.handleAgAprOpe(parada, authorization)
          break
        default:
          break
      }
    }
  }

  public async prevLevel(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    let historico = null

    switch (parada.idStatus.ID_ITEM_LOOKUP) {
      case 'AAPRV_USINA':
        parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
          'STATUS_PROG_PARADA',
          'RASCUNHO'
        )
        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'RASCUNHO',
          parada.ID_STATUS_PROGRAMACAO,
          parada.USER_UPDATE
        )
        break
      case 'AAPRV_OPE':
        parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
          'STATUS_PROG_PARADA',
          'RASCUNHO'
        )
        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'RASCUNHO',
          parada.ID_STATUS_PROGRAMACAO,
          parada.USER_UPDATE
        )
        break
      case 'APRV':
        parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
          'STATUS_PROG_PARADA',
          'RASCUNHO'
        )
        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'RASCUNHO',
          parada.ID_STATUS_PROGRAMACAO,
          parada.USER_UPDATE
        )
        break
    }

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
  }

  public async reprNextLevel(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    switch (parada.idStatusReprogramacao.ID_ITEM_LOOKUP) {
      case 'AAPRV_USINA':
        return this.reprogramacaoFluxoService.handleAgAprUsina(parada, authorization)
        break
      case 'AAPRV_OPE':
        return this.reprogramacaoFluxoService.handleAgAprOpe(parada, authorization)
        break
      case 'APRV':
        return this.reprogramacaoFluxoService.handleAprv(parada, authorization)
        break
      default:
        break
    }
  }

  public getStatus(parada: ProgramacaoParada): TemLookup {
    switch (parada.ID_STATUS_PROGRAMACAO) {
      case 'P':
        return parada.idStatus
      case 'C':
        return parada.idStatusCancelamento
    }
  }

  public async setStatusPp(parada: ProgramacaoParada, status: string): Promise<ProgramacaoParada> {
    switch (parada.ID_STATUS_PROGRAMACAO) {
      case 'P':
        parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
          'STATUS_PROG_PARADA',
          status
        )
        return
      case 'R':
        parada.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
          'STATUS_PROG_PARADA',
          status
        )
        return
      case 'C':
        parada.idStatusCancelamento = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
          'STATUS_PROG_PARADA',
          status
        )
        return
    }
  }
}
