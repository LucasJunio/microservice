import { inject, injectable } from 'inversify'
import * as moment from 'moment'

import { ProgramacaoParada } from '../../../entities/programacaoParada'
import { ParadaProgramadaService } from '../parada_programada/paradaProgramadaService'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'
import { TYPE } from '../../../constants/types'
import { parseISO } from 'date-fns'

export interface IReprogramacaoFluxoService {
  handleAgAprUsina(parada: ProgramacaoParada): Promise<ProgramacaoParada>
  handleAgAprOpe(parada: ProgramacaoParada): Promise<ProgramacaoParada>
  handleAprv(parada: ProgramacaoParada): Promise<ProgramacaoParada>
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

  public async handleAgAprUsina(parada: ProgramacaoParada): Promise<ProgramacaoParada> {
    let historico = null
    // caso Longo prazo, intempestiva ou longo prazo, vai direto para aprovado
    if (
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PU' ||
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PI' ||
      parada.idTipoParada.ID_ITEM_LOOKUP === 'PL'
    ) {
      parada.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('APRV', 13)

      parada.DT_HORA_INICIO_PROGRAMACAO = parada.DT_HORA_INICIO_REPROGRAMACAO
      parada.DT_HORA_TERMINO_PROGRAMACAO = parada.DT_HORA_TERMINO_REPROGRAMACAO
      parada.cdClassificacaoProgrParada = parada.cdClassifReprogrParada
      parada.cdSubclassifProgrParada = parada.cdSubclasReprogrParada
      parada.NR_REPROGRAMACOES_APROVADAS += 1
      parada.idTipoProgramacao = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('R', 12)

      parada.idTipoParada = await this.sauItemLookUpRepository.getTipoParadaByDate(
        parseISO(parada.DT_CRIACAO_PARADA.toString()),
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
      parada.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('AAPRV_OPE', 13)
      historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
        parada,
        'EM ANÁLISE OPE',
        parada.ID_STATUS_PROGRAMACAO,
        parada.USER_UPDATE
      )
    }

    if (historico) {
      await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico)
    }
    return this.paradaProgramadaService.saveProgramacaoParada(parada)
  }

  public async handleAgAprOpe(parada: ProgramacaoParada): Promise<ProgramacaoParada> {
    let historico = null

    parada.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('APRV', 13)

    parada.DT_HORA_INICIO_PROGRAMACAO = parada.DT_HORA_INICIO_REPROGRAMACAO
    parada.DT_HORA_TERMINO_PROGRAMACAO = parada.DT_HORA_TERMINO_REPROGRAMACAO
    parada.cdClassificacaoProgrParada = parada.cdClassifReprogrParada
    parada.cdSubclassifProgrParada = parada.cdSubclasReprogrParada
    parada.NR_REPROGRAMACOES_APROVADAS += 1
    parada.idTipoProgramacao = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('R', 12)

    parada.idTipoParada = await this.sauItemLookUpRepository.getTipoParadaByDate(
      parseISO(parada.DT_CRIACAO_PARADA.toString()),
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
      await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico)
    }
    return this.paradaProgramadaService.saveProgramacaoParada(parada)
  }

  public async handleAprv(parada: ProgramacaoParada): Promise<ProgramacaoParada> {
    parada.ID_STATUS_PROGRAMACAO = 'E'
    parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('EXECUCAO', 13)

    return this.paradaProgramadaService.saveProgramacaoParada(parada)
  }
}
