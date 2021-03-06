import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../constants/types'

import { SauItemLookUpRepository } from '../../../../repositories/sauItemLookupRepository'
import { SauProgramacaoParadaRepository } from '../../../../repositories/sauProgramacaoParadaRepository'
import { SauHistProgramacaoParadaRepository } from '../../../../repositories/sauHistProgramacaoParadaRepository'
import { ProgramacaoParada } from '../../../../entities/programacaoParada'
import { ParadaProgramadaService } from '../../parada_programada/paradaProgramadaService'
import { PgiIntegrationService } from '../../pgiIntegration/pgiIntegrationService'

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

  @inject(TYPE.PgiIntegrationService)
  private readonly pgiIntegrationService: PgiIntegrationService

  public async handleRascunho(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    let historico = null

    parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'STATUS_PROG_PARADA',
      'AAPRV_USINA'
    )
    historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'EM AN??LISE USINA',
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
      parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
        'STATUS_PROG_PARADA',
        'APRV'
      )
      historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
        parada,
        'APROVADA',
        parada.ID_STATUS_PROGRAMACAO,
        parada.USER_UPDATE
      )
      await this.pgiIntegrationService.handleLinkWithPgi(parada)
    } else {
      parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
        'STATUS_PROG_PARADA',
        'AAPRV_OPE'
      )
      historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
        parada,
        'EM AN??LISE OPE',
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

    parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'STATUS_PROG_PARADA',
      'APRV'
    )

    historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'APROVADA',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE
    )
    if (historico) {
      await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    }

    await this.pgiIntegrationService.handleLinkWithPgi(parada)
    return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
  }

  public async handleAprv(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    parada.ID_STATUS_PROGRAMACAO = 'E'
    parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'STATUS_PROG_PARADA',
      'EXECUCAO'
    )

    return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
  }

  public async handlePrevLevel(
    parada: ProgramacaoParada,
    authorization: string
  ): Promise<ProgramacaoParada | PromiseLike<ProgramacaoParada>> {
    switch (parada.idStatus.ID_ITEM_LOOKUP) {
      case 'AAPRV_USINA':
      case 'AAPRV_OPE':
        parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
          'STATUS_PROG_PARADA',
          'RASCUNHO'
        )
        const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'RASCUNHO',
          parada.ID_STATUS_PROGRAMACAO,
          parada.USER_UPDATE
        )
        await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
        return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
        break

      default:
        throw new Error('Documento nao pode voltar no fluxo.')
    }
  }
}
