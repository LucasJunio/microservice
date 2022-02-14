import { inject, injectable } from 'inversify'
import * as _ from 'lodash'

import { TYPE } from '../../../constants/types'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'

import { ProgramacaoParada } from '../../../entities/programacaoParada'

import { ParadaProgramadaService } from '../parada_programada/paradaProgramadaService'
import { TemLookup } from '../../../entities/temLookup'
import { ProgramacaoFluxoService } from './fluxoStatus/programacaoFluxoService'
import { ReprogramacaoFluxoService } from './fluxoStatus/reprogramacaoFluxoService'
import { CancelamentoFluxoService } from './fluxoStatus/cancelamentoFluxoService'
import { ExecucaoFluxoService } from './fluxoStatus/execucaoFluxoService'

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

  @inject(TYPE.ExecucaoFluxoService)
  private readonly execucaoFluxoService: ExecucaoFluxoService

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
        return this.execucaoFluxoService.handleExecNext(parada, authorization)
        break
      case 'AAPRV':
        return this.execucaoFluxoService.handleAgAprOpeNext(parada, authorization)
        break
      default:
        throw new Error('Documento nao pode avançar no fluxo.')
    }
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
          throw new Error('Documento nao pode avançar no fluxo.')
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
          throw new Error('Documento nao pode voltar no fluxo.')
          break
      }
    }
  }

  public async prevLevel(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    if (parada.ID_STATUS_PROGRAMACAO === 'P') {
      return this.programacaoFluxoService.handlePrevLevel(parada, authorization)
    }
    if (parada.ID_STATUS_PROGRAMACAO === 'C') {
      return this.cancelamentoFluxoService.handlePrevLevel(parada, authorization)
    }
    if (parada.ID_STATUS_PROGRAMACAO === 'R') {
      return this.reprogramacaoFluxoService.handlePrevLevel(parada, authorization)
    }
    if (parada.ID_STATUS_PROGRAMACAO === 'E') {
      return this.execucaoFluxoService.handlePrevLevel(parada, authorization)
    }
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

  public async back_program(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    const previus = await this.paradaProgramadaService.getById(parada.CD_PROGRAMACAO_PARADA)

    const statusAprov = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'STATUS_PROG_PARADA',
      'APRV'
    )

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

    const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'DEVOLVIDO',
      from,
      parada.USER_UPDATE,
      `O documento foi devolvido para o fluxo de ${
        parada.ID_STATUS_PROGRAMACAO === 'P' ? 'PROGRAMAÇÃO' : 'REPROGRAMAÇÃO'
      }`
    )

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)

    delete parada.sauProgramacaoParadaUgs
    await this.sauProgramacaoParadaRepository.saveProgramacaoParada(parada)
    const paradaRet = await this.paradaProgramadaService.getById(parada.CD_PROGRAMACAO_PARADA)

    this.paradaProgramadaService.fluxoNotificacaoCancRepr(previus, paradaRet, authorization)
    return paradaRet
  }
}
