import { inject, injectable } from 'inversify'
import { TYPE } from '../../../constants/types'
import * as moment from 'moment'

import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'
import { ProgramacaoParada } from '../../../entities/programacaoParada'
import { HistProgramacaoParada } from '../../../entities/histProgramacaoParada'
import { ParadaProgramadaService } from '../parada_programada/paradaProgramadaService'

export interface IProgramacaoFluxoService {
  handleRascunho(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
  handleAgAprUsina(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
  handleAgAprOpe(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
  handleAprv(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
}

@injectable()
export class ProgramacaoFluxoService implements IProgramacaoFluxoService {
  // SERVICES
  @inject(TYPE.ParadaProgramadaService)
  private readonly paradaProgramadaService: ParadaProgramadaService

  // REPOSITORIES
  @inject(TYPE.SauItemLookUpRepository)
  private readonly sauItemLookUpRepository: SauItemLookUpRepository

  @inject(TYPE.SauProgramacaoParadaRepository)
  private readonly sauProgramacaoParadaRepository: SauProgramacaoParadaRepository

  @inject(TYPE.SauHistProgramacaoParadaRepository)
  private readonly sauHistProgramacaoParadaRepository: SauHistProgramacaoParadaRepository

  public async handleRascunho(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    let historico = null

    parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('AAPRV_USINA', 13)
    historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'EM ANÁLISE USINA',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE
    )

    if (historico) {
      await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    }
    return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
  }

  public async handleAgAprUsina(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    let historico = null

    // caso Longo prazo, intempestiva ou longo prazo, vai direto para aprovado
    if (
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PU' ||
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PI' ||
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PL'
    ) {
      parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('APRV', 13)
      historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
        parada,
        'APROVADA',
        parada.ID_STATUS_PROGRAMACAO,
        parada.USER_UPDATE
      )
    } else {
      parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('AAPRV_OPE', 13)
      historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
        parada,
        'EM ANÁLISE OPE',
        parada.ID_STATUS_PROGRAMACAO,
        parada.USER_UPDATE
      )
    }

    if (historico) {
      await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    }
    return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
  }

  public async handleAgAprOpe(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    let historico = null

    parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('APRV', 13)

    historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'APROVADA',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE
    )
    if (historico) {
      await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    }
    return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
  }

  public async handleAprv(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    parada.ID_STATUS_PROGRAMACAO = 'E'
    parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('EXECUCAO', 13)

    return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
  }
}
