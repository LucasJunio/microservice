import { inject, injectable } from 'inversify'
import * as moment from 'moment'

import { ProgramacaoParada } from '../../../../entities/programacaoParada'
import { ParadaProgramadaService } from '../../parada_programada/paradaProgramadaService'
import { SauItemLookUpRepository } from '../../../../repositories/sauItemLookupRepository'
import { SauProgramacaoParadaRepository } from '../../../../repositories/sauProgramacaoParadaRepository'
import { SauHistProgramacaoParadaRepository } from '../../../../repositories/sauHistProgramacaoParadaRepository'
import { TYPE } from '../../../../constants/types'
import { parseISO } from 'date-fns'
import formatDate from '../../../../util/formatDate'

export interface IReprogramacaoFluxoService {
  handleAgAprUsina(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
  handleAgAprOpe(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
  handleAprv(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada>
}

@injectable()
export class ReprogramacaoFluxoService implements IReprogramacaoFluxoService {
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

  public async handlePrevLevel(
    parada: ProgramacaoParada,
    authorization: string
  ): Promise<ProgramacaoParada | PromiseLike<ProgramacaoParada>> {
    switch (parada.idStatusReprogramacao.ID_ITEM_LOOKUP) {
      case 'AAPRV_OPE':
        parada.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
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

  public async handleAgAprUsina(parada: ProgramacaoParada, authorization: string): Promise<ProgramacaoParada> {
    let historico = null
    // caso Longo prazo, intempestiva ou longo prazo, vai direto para aprovado
    if (
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PU' ||
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PI' ||
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PL'
    ) {
      
      parada.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
        'STATUS_PROG_PARADA',
        'APRV'
      )

      parada.DT_HORA_INICIO_PROGRAMACAO = parada.DT_HORA_INICIO_REPROGRAMACAO
      parada.DT_HORA_TERMINO_PROGRAMACAO = parada.DT_HORA_TERMINO_REPROGRAMACAO
      parada.cdClassificacaoProgrParada = parada.cdClassifReprogrParada
      parada.cdSubclassifProgrParada = parada.cdSubclasReprogrParada
      parada.NR_REPROGRAMACOES_APROVADAS += 1
      parada.DS_PROGRAMACAO_PARADA = parada.DS_NOVA_DESCRICAO_PROGR_PARADA
      parada.idTipoProgramacao = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
        'SITUACAO_PROG_PARADA',
        'R'
      )          
      
      parada.idTipoParada = await this.sauItemLookUpRepository.getTipoParadaByDate(
        formatDate(),
        parseISO(parada.DT_HORA_INICIO_REPROGRAMACAO.toString())
      )
      
      historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
        parada,
        'APROVADA',
        parada.ID_STATUS_PROGRAMACAO,
        parada.USER_UPDATE,
        `A Reprogramação foi aprovada` +
          '\n' +
          `Início previsto ${moment(parada.DT_HORA_INICIO_REPROGRAMACAO)
            .subtract(3, 'hour')
            .format('DD/MM/YYYY HH:mm')}` +
          `\n` +
          `Término previsto ${moment(parada.DT_HORA_TERMINO_REPROGRAMACAO)
            .subtract(3, 'hour')
            .format('DD/MM/YYYY HH:mm')}` +
          `\n` +
          `Motivo: ${parada.DS_MOTIVO_REPROGRAMACAO}`
      )
    } else {
      parada.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
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

    parada.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'STATUS_PROG_PARADA',
      'APRV'
    )

    parada.DT_HORA_INICIO_PROGRAMACAO = parada.DT_HORA_INICIO_REPROGRAMACAO
    parada.DT_HORA_TERMINO_PROGRAMACAO = parada.DT_HORA_TERMINO_REPROGRAMACAO
    parada.cdClassificacaoProgrParada = parada.cdClassifReprogrParada
    parada.cdSubclassifProgrParada = parada.cdSubclasReprogrParada
    parada.NR_REPROGRAMACOES_APROVADAS += 1
    parada.DS_PROGRAMACAO_PARADA = parada.DS_NOVA_DESCRICAO_PROGR_PARADA
    parada.idTipoProgramacao = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'SITUACAO_PROG_PARADA',
      'R'
    )

    parada.idTipoParada = await this.sauItemLookUpRepository.getTipoParadaByDate(
      formatDate(),
      parseISO(parada.DT_HORA_INICIO_REPROGRAMACAO.toString())
    )

    historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'APROVADA',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE,
      `A Reprogramação foi aprovada` +
        '\n' +
        `Início previsto ${moment(parada.DT_HORA_INICIO_REPROGRAMACAO)
          .subtract(3, 'hour')
          .format('DD/MM/YYYY HH:mm')}` +
        `\n` +
        `Término previsto ${moment(parada.DT_HORA_TERMINO_REPROGRAMACAO)
          .subtract(3, 'hour')
          .format('DD/MM/YYYY HH:mm')}` +
        `\n` +
        `Motivo: ${parada.DS_MOTIVO_REPROGRAMACAO}`
    )

    if (historico) {
      await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    }
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
}
