import { inject, injectable } from 'inversify'
import * as moment from 'moment'
import * as _ from 'lodash'

import { ProgramacaoParada } from '../../../entities/programacaoParada'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { TYPE } from '../../../constants/types'
import { Pgi } from '../../../entities/pgi'

export interface IPgiIntegrationService {
  handleLinkWithPgi(parada: ProgramacaoParada): Promise<ProgramacaoParada>
}

@injectable()
export class PgiIntegrationService implements IPgiIntegrationService {
  @inject(TYPE.SauItemLookUpRepository)
  private readonly sauItemLookUpRepository: SauItemLookUpRepository

  public async handleLinkWithPgi(parada: ProgramacaoParada): Promise<ProgramacaoParada> {
    if (parada.sauPgis.length === 0 || parada.FL_VINCULO_DI === 0) {
      return
    }

    const isExecOrConcl = _.some(
      parada.sauPgis,
      pgis => pgis.idStatus.ID_ITEM_LOOKUP === 'EXECUCAO' || pgis.idStatus.ID_ITEM_LOOKUP === 'CONCLUIDO'
    )

    const isConcl = !_.some(parada.sauPgis, pgis => pgis.idStatus.ID_ITEM_LOOKUP !== 'CONCLUIDO')

    if (!isExecOrConcl) {
      return
    }
    parada.DT_HORA_INICIO_SERVICO = this.getBackwardDate(parada.sauPgis)

    if (isConcl) {
      parada.DT_HORA_TERMINO_SERVICO = this.getForwardDate(parada.sauPgis)
    }
    parada.ID_STATUS_PROGRAMACAO = 'E'
    parada.DS_SERVICO_EXECUTADO = parada.DS_PROGRAMACAO_PARADA

    parada.idStatus = await this.sauItemLookUpRepository.getItemLookUpByIdLookupAndIdItemLookup(
      'STATUS_PROG_PARADA',
      isConcl ? 'AAPRV' : 'EXECUCAO'
    )

    return parada
  }

  public getForwardDate(pgis: Pgi[]): Date {
    let forward = null

    for (const di of pgis) {
      if (_.isNil(forward)) {
        forward = di.DT_FIM
        continue
      }
      if (di.idStatus.ID_ITEM_LOOKUP !== 'CANCELADO' && !_.isNil(di.DT_FIM) && moment(di.DT_FIM).isAfter(forward)) {
        forward = di.DT_FIM
      }
    }

    return forward
  }

  public getBackwardDate(pgis: Pgi[]): Date {
    let backward = null

    for (const di of pgis) {
      if (_.isNil(backward)) {
        backward = di.DT_INICIO
        continue
      }
      if (
        di.idStatus.ID_ITEM_LOOKUP !== 'CANCELADO' &&
        !_.isNil(di.DT_INICIO) &&
        moment(di.DT_INICIO).isBefore(backward)
      ) {
        backward = di.DT_INICIO
      }
    }

    return backward
  }
}
