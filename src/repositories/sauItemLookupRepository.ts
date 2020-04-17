import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { setYear, differenceInHours, isAfter, isSameYear, isBefore, addYears, differenceInYears } from 'date-fns'

import { TemLookup } from '../entities/temLookup'

export interface ISauItemLookUpRepository {
  getItemLookUpByIdLookup(ID_LOOKUP: string): Promise<TemLookup[]>
  getItemLookUpByCdAndId(idItemLookup, cdLookup): Promise<TemLookup>
  getTipoParadaByDate(dateFrom: Date, dateTo: Date): Promise<TemLookup>
}

@injectable()
export class SauItemLookUpRepository implements ISauItemLookUpRepository {
  private readonly sauItemLookUpRepository: Repository<TemLookup>

  constructor() {
    this.sauItemLookUpRepository = getRepository(TemLookup)
  }

  // MOTIVO_REPROG_PARADA STATUS_PROG_PARADA SITUACAO_PROG_PARADA
  public getItemLookUpByIdLookup(ID_LOOKUP: string): Promise<TemLookup[]> {
    return this.sauItemLookUpRepository
      .createQueryBuilder('l')
      .innerJoin('l.cdLookup', 'cdLookup')
      .where('cdLookup.ID_LOOKUP = :ID_LOOKUP', { ID_LOOKUP })
      .orderBy('l.ID_ITEM_LOOKUP', 'ASC')
      .getMany()
  }

  public getItemLookUpByCdAndId(idItemLookup, cdLookup): Promise<TemLookup> {
    console.log(idItemLookup, cdLookup, '<--------------')
    return this.sauItemLookUpRepository.findOne({
      select: ['ID_ITEM_LOOKUP', 'DS_ITEM_LOOKUP', 'CD_ITEM_LOOKUP'],
      where: {
        cdLookup,
        ID_ITEM_LOOKUP: idItemLookup
      }
    })
  }

  public async getTipoParadaByDate(datef: Date, datet: Date): Promise<TemLookup> {
    const currentYear = new Date().getFullYear()
    const achorDate = setYear(new Date(2015, 7, 31), currentYear) // 31-08-currentYear

    const difference = differenceInHours(datet, datef)

    if (difference < 24) {
      // Diferença < 24 horas intempestiva
      return this.getItemLookUpByCdAndId('PI', 11)
    }

    if (difference < 48) {
      // Diferença < 48 horas Urgente
      return this.getItemLookUpByCdAndId('PU', 11)
    }

    // caso datef ser antes de 31/08, datef e datet mesmo ano
    // || caso datef ser depois de 31/08 datet tem que ser ano de datef +1
    if (
      (isBefore(datef, achorDate) && isSameYear(datef, datet)) ||
      (isAfter(datef, achorDate) && isSameYear(datet, addYears(datef, 1)))
    ) {
      return this.getItemLookUpByCdAndId('PP', 11)
    }

    // caso datef ser antes de 30/08 e datet for o ano de datef + 1
    if (isBefore(datef, achorDate) && isSameYear(datet, addYears(datef, 1))) {
      return this.getItemLookUpByCdAndId('PA', 11)
    }

    if (differenceInYears(datet, datef) <= 2) {
      return this.getItemLookUpByCdAndId('PB', 11)
    }

    return this.getItemLookUpByCdAndId('PL', 11)
  }
}
