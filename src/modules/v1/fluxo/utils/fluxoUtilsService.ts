import { inject, injectable } from 'inversify'
import * as moment from 'moment'
import { Pgi } from '../../../../entities/pgi'

export interface IFluxoUtilsService {
  getForwardDate(pgis: Pgi[]): Date
  getBackwardDate(pgis: Pgi[]): Date
}

@injectable()
export class FluxoUtilsService implements IFluxoUtilsService {
  public getForwardDate(pgis: Pgi[]): Date {
    let forward = pgis[0].DT_FIM

    for (const di of pgis) {
      if (moment(di.DT_FIM).isAfter(forward)) {
        forward = di.DT_FIM
      }
    }

    return forward
  }

  public getBackwardDate(pgis: Pgi[]): Date {
    let backward = pgis[0].DT_INICIO

    for (const di of pgis) {
      if (moment(di.DT_INICIO).isBefore(backward)) {
        backward = di.DT_INICIO
      }
    }

    return backward
  }
}
