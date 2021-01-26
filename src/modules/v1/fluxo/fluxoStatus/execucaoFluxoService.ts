import { inject, injectable } from 'inversify'
import { isEmpty } from 'lodash'

import { ProgramacaoParada } from '../../../../entities/programacaoParada'
import { ParadaProgramadaService } from '../../parada_programada/paradaProgramadaService'
import { SauItemLookUpRepository } from '../../../../repositories/sauItemLookupRepository'
import { SauProgramacaoParadaRepository } from '../../../../repositories/sauProgramacaoParadaRepository'
import { SauHistProgramacaoParadaRepository } from '../../../../repositories/sauHistProgramacaoParadaRepository'
import { TYPE } from '../../../../constants/types'

export interface IExecucaoFluxoService {
  handleExecPrev(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
  handleAgAprOpePrev(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
  handleConclPrev(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
}

@injectable()
export class ExecucaoFluxoService implements IExecucaoFluxoService {
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

  public async handleExecPrev(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    parada.DT_HORA_INICIO_SERVICO = null
    parada.DT_HORA_TERMINO_SERVICO = null
    parada.ID_STATUS_PROGRAMACAO = parada.NR_REPROGRAMACOES_APROVADAS > 0 ? 'R' : 'P'
    parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'STATUS_PROG_PARADA',
      'APRV'
    )
    parada.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'STATUS_PROG_PARADA',
      'APRV'
    )

    const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'APROVADO',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE
    )

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
  }

  public async handleAgAprOpePrev(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    parada.DT_HORA_TERMINO_SERVICO = null
    parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'STATUS_PROG_PARADA',
      'EXECUCAO'
    )
    const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'EXECUCAO',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE
    )

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
  }

  public async handleConclPrev(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'STATUS_PROG_PARADA',
      'AAPRV'
    )
    const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'AGUARDANDO APROVAÇÃO OPE',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE
    )

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    return this.paradaProgramadaService.saveProgramacaoParada(parada, authorization)
  }

  public async handlePrevLevel(
    parada: ProgramacaoParada,
    authorization: string
  ): Promise<ProgramacaoParada | PromiseLike<ProgramacaoParada>> {
    if (!isEmpty(parada.sauPgis)) {
      throw new Error("Existe DI's vinculados a esse documento")
    }

    switch (parada.idStatus.ID_ITEM_LOOKUP) {
      case 'EXECUCAO':
        return this.handleExecPrev(parada, authorization)
        break
      case 'AAPRV':
        return this.handleAgAprOpePrev(parada, authorization)
        break
      case 'CONCL':
        return this.handleConclPrev(parada, authorization)
        break
      default:
        throw new Error('Documento nao pode voltar no fluxo.')
    }
  }
}
