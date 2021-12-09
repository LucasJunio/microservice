import { inject, injectable } from 'inversify'

import { ProgramacaoParada } from '../../../../entities/programacaoParada'
import { ParadaProgramadaService } from '../../parada_programada/paradaProgramadaService'
import { SauItemLookUpRepository } from '../../../../repositories/sauItemLookupRepository'
import { SauProgramacaoParadaRepository } from '../../../../repositories/sauProgramacaoParadaRepository'
import { SauHistProgramacaoParadaRepository } from '../../../../repositories/sauHistProgramacaoParadaRepository'
import { TYPE } from '../../../../constants/types'

export interface ICancelamentoFluxoService {
  handleAgAprUsina(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
  handleAgAprOpe(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
}

@injectable()
export class CancelamentoFluxoService implements ICancelamentoFluxoService {
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

  public async handleAgAprUsina(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    let historico = null

    // caso Longo prazo, intempestiva ou longo prazo, vai direto para aprovado
    if (
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PU' ||
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PI' ||
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PL'
    ) {
      parada.idStatusCancelamento = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
        'STATUS_PROG_PARADA',
        'CANC'
      )
      parada.idStatus = parada.idStatusCancelamento

      historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
        parada,
        'CANCELADO',
        parada.ID_STATUS_PROGRAMACAO,
        parada.USER_UPDATE
      )
    } else {
      parada.idStatusCancelamento = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
        'STATUS_PROG_PARADA',
        'AAPRV_OPE'
      )
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

    parada.idStatusCancelamento = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'STATUS_PROG_PARADA',
      'CANC'
    )
    parada.idStatus = parada.idStatusCancelamento

    historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'CANCELADO',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE
    )
    if (historico) {
      await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    }
    return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
  }

  public async handlePrevLevel(
    parada: ProgramacaoParada,
    authorization: string
  ): Promise<ProgramacaoParada | PromiseLike<ProgramacaoParada>> {
    switch (parada.idStatusCancelamento.ID_ITEM_LOOKUP) {
      case 'AAPRV_OPE':
        parada.idStatusCancelamento = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
          'STATUS_PROG_PARADA',
          'AAPRV_USINA'
        )
        const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'EM ANALISE USINA',
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
