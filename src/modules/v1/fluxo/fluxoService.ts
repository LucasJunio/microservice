import { inject, injectable } from 'inversify'
import * as _ from 'lodash'

import { TYPE } from '../../../constants/types'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'

import { SAU_PROGRAMACAO_PARADA } from '../../../entities/SAU_PROGRAMACAO_PARADA'

import { ParadaProgramadaService } from '../parada_programada/paradaProgramadaService'
import { SAU_ITEM_LOOKUP } from '../../../entities/SAU_ITEM_LOOKUP'
import * as moment from 'moment'

export interface IFluxoService {
  nextLevel(parada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA>
  prevLevel(parada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA>
  getStatus(parada: SAU_PROGRAMACAO_PARADA): SAU_ITEM_LOOKUP
  setStatusPp(parada: SAU_PROGRAMACAO_PARADA, status: string): Promise<SAU_PROGRAMACAO_PARADA>
}

@injectable()
export class FluxoService implements IFluxoService {
  // SERVICES
  @inject(TYPE.ParadaProgramadaService)
  private readonly paradaProgramadaService: ParadaProgramadaService

  // REPOSITORIES
  @inject(TYPE.SauItemLookUpRepository)
  private readonly sauItemLookUpRepository: SauItemLookUpRepository

  @inject(TYPE.SauHistProgramacaoParadaRepository)
  private readonly sauHistProgramacaoParadaRepository: SauHistProgramacaoParadaRepository

  public async nextLevel(parada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    let historico = null

    const status = this.getStatus(parada)

    switch (status.ID_ITEM_LOOKUP) {
      case 'RASCUNHO':
        await this.setStatusPp(parada, 'AAPRV_USINA')
        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'EM ANÁLISE USINA',
          parada.ID_STATUS_PROGRAMACAO,
          parada.USER_UPDATE
        )
        break
      case 'AAPRV_USINA':
        await this.setStatusPp(parada, 'AAPRV_OPE')
        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'EM ANÁLISE OPE',
          parada.ID_STATUS_PROGRAMACAO,
          parada.USER_UPDATE
        )
        break
      case 'AAPRV_OPE':
        let status = null
        let msg = ''

        switch (parada.ID_STATUS_PROGRAMACAO) {
          case 'P':
            parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('APRV', 13)
            status = 'APROVADA'
            msg =
              `O documento foi aprovado` +
              '\n' +
              `Início: ${moment(parada.DT_HORA_INICIO_PROGRAMACAO)
                .subtract(3, 'hour')
                .format('DD/MM/YYYY HH:mm')}` +
              '\n' +
              `Término: ${moment(parada.DT_HORA_TERMINO_PROGRAMACAO)
                .subtract(3, 'hour')
                .format('DD/MM/YYYY HH:mm')}`
            break

          case 'C':
            parada.idStatusCancelamento = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('CANC', 13)
            status = 'CANCELADO'
            msg = `O documento foi cancelado`
            parada.DT_CANCELAMENTO = new Date()
            parada.CD_USUARIO_CANCELAMENTO = parada.USER_UPDATE
            break
        }

        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          status,
          parada.ID_STATUS_PROGRAMACAO,
          parada.USER_UPDATE,
          msg
        )
        break
    }

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico)
    return this.paradaProgramadaService.saveProgramacaoParada(parada)
  }

  public async prevLevel(parada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    let historico = null

    switch (parada.idStatus.ID_ITEM_LOOKUP) {
      case 'AAPRV_USINA':
      case 'AAPRV_OPE':
        parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('RASCUNHO', 13)
        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'RASCUNHO',
          parada.ID_STATUS_PROGRAMACAO,
          parada.USER_UPDATE
        )
        break
    }

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico)
    return this.paradaProgramadaService.saveProgramacaoParada(parada)
  }

  public async reprNextLevel(parada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    let historico = null

    switch (parada.idStatusReprogramacao.ID_ITEM_LOOKUP) {
      case 'AAPRV_USINA':
        parada.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('AAPRV_OPE', 13)
        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'EM ANÁLISE OPE',
          parada.ID_STATUS_PROGRAMACAO,
          parada.USER_UPDATE
        )
        break
      case 'AAPRV_OPE':
        parada.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('APRV', 13)

        parada.DT_HORA_INICIO_PROGRAMACAO = parada.DT_HORA_INICIO_REPROGRAMACAO
        parada.DT_HORA_TERMINO_PROGRAMACAO = parada.DT_HORA_TERMINO_REPROGRAMACAO
        parada.cdClassificacaoProgrParada = parada.cdClassifReprogrParada
        parada.cdSubclassifProgrParada = parada.cdSubclasReprogrParada
        parada.NR_REPROGRAMACOES_APROVADAS += 1
        parada.idTipoProgramacao = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('R', 12)

        parada.idTipoParada = await this.sauItemLookUpRepository.getTipoParadaByDate(
          parada.DT_CRIACAO_PARADA,
          parada.DT_HORA_INICIO_REPROGRAMACAO
        )

        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'APROVADA',
          parada.ID_STATUS_PROGRAMACAO,
          parada.USER_UPDATE,
          `A Reprogramação foi aprovado` +
            '\n' +
            `Início previsto ${moment(parada.DT_HORA_INICIO_REPROGRAMACAO)
              .subtract(3, 'hour')
              .format('DD/MM/YYYY HH:mm')}` +
            `\n` +
            `Término previsto ${moment(parada.DT_HORA_TERMINO_REPROGRAMACAO)
              .subtract(3, 'hour')
              .format('DD/MM/YYYY HH:mm')}`
        )
        break
    }

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico)

    return this.paradaProgramadaService.saveProgramacaoParada(parada)
  }

  public getStatus(parada: SAU_PROGRAMACAO_PARADA): SAU_ITEM_LOOKUP {
    switch (parada.ID_STATUS_PROGRAMACAO) {
      case 'P':
        return parada.idStatus
      case 'C':
        return parada.idStatusCancelamento
    }
  }

  public async setStatusPp(parada: SAU_PROGRAMACAO_PARADA, status: string): Promise<SAU_PROGRAMACAO_PARADA> {
    switch (parada.ID_STATUS_PROGRAMACAO) {
      case 'P':
        parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByCdAndId(status, 13)
        return
      case 'C':
        parada.idStatusCancelamento = await this.sauItemLookUpRepository.getItemLookUpByCdAndId(status, 13)
        return
    }
  }
}
