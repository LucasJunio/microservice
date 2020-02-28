import { inject, injectable } from 'inversify'
import * as _ from 'lodash'

import { TYPE } from '../../../constants/types'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'
import { SauReprogramacaoParadaRepository } from '../../../repositories/sauReprogramacaoParadaRepository'

import { SAU_PROGRAMACAO_PARADA } from '../../../entities/SAU_PROGRAMACAO_PARADA'

import { ParadaProgramadaService } from '../parada_programada/paradaProgramadaService'
import { SAU_ITEM_LOOKUP } from '../../../entities/SAU_ITEM_LOOKUP'

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

  @inject(TYPE.SauReprogramacaoParadaRepository)
  private readonly sauReprogramacaoParadaRepository: SauReprogramacaoParadaRepository

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
          'AAPRV_USINA',
          parada.ID_STATUS_PROGRAMACAO
        )
        break
      case 'AAPRV_USINA':
        await this.setStatusPp(parada, 'AAPRV_OPE')
        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'AAPRV_OPE',
          parada.ID_STATUS_PROGRAMACAO
        )
        break
      case 'AAPRV_OPE':
        await this.setStatusPp(parada, 'CONCL')
        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'CONCL',
          parada.ID_STATUS_PROGRAMACAO
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
          parada.ID_STATUS_PROGRAMACAO
        )
        break
    }

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico)
    return this.paradaProgramadaService.saveProgramacaoParada(parada)
  }

  public async reprNextLevel(parada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    const reprogr = _.last(parada.sauReprogramacaoParadas)
    let historico = null

    switch (reprogr.idStatusReprogramacao.ID_ITEM_LOOKUP) {
      case 'AAPRV_USINA':
        reprogr.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('AAPRV_OPE', 13)
        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'AAPRV_OPE',
          parada.ID_STATUS_PROGRAMACAO
        )
        break
      case 'AAPRV_OPE':
        reprogr.idStatusReprogramacao = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('CONCL', 13)
        historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
          parada,
          'CONCL',
          parada.ID_STATUS_PROGRAMACAO
        )
        break
    }

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico)
    await this.sauReprogramacaoParadaRepository.saveReprogramacaoParada(reprogr)

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
