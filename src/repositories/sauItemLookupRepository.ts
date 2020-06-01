import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import {
  setYear,
  differenceInHours,
  isAfter,
  isSameYear,
  isBefore,
  addYears,
  differenceInYears,
  differenceInDays,
  getYear,
  parseISO
} from 'date-fns'

import { TemLookup } from '../entities/temLookup'
import { ParamProgramacaoParadas } from '../entities/paramProgramacaoParadas'

export interface ISauItemLookUpRepository {
  getItemLookUpByIdLookup(ID_LOOKUP: string): Promise<TemLookup[]>
  getItemLookUpByCdAndId(idItemLookup, cdLookup): Promise<TemLookup>
  getTipoParadaByDate(dateFrom: Date, dateTo: Date): Promise<TemLookup>
}

@injectable()
export class SauItemLookUpRepository implements ISauItemLookUpRepository {
  private readonly sauItemLookUpRepository: Repository<TemLookup>
  private readonly sauParamProgramacaoParadaRepository: Repository<ParamProgramacaoParadas>

  constructor() {
    this.sauItemLookUpRepository = getRepository(TemLookup)
    this.sauParamProgramacaoParadaRepository = getRepository(ParamProgramacaoParadas)
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
    return this.sauItemLookUpRepository.findOne({
      select: ['ID_ITEM_LOOKUP', 'DS_ITEM_LOOKUP', 'CD_ITEM_LOOKUP'],
      where: {
        cdLookup,
        ID_ITEM_LOOKUP: idItemLookup
      }
    })
  }

  public async getTipoParadaByDate(datef: Date, datet: Date): Promise<TemLookup> {
    const params = await this.sauParamProgramacaoParadaRepository.findOne({
      where: {
        CD_PARAM_PROGRAMACAO_PARADAS: 1
      }
    })

    const currentYear = datet.getFullYear()
    const dtFinalParadasProgramadas = setYear(params.DT_FINAL_APROVACAO, currentYear - 1) // 31-08-currentYear
    const dtFinalParadasAnuais = setYear(params.DT_FINAL_PARADAS_ANUAIS, currentYear - 1) // 31-08-currentYear

    const difference = differenceInHours(datet, datef)

    if (difference <= 24) {
      return this.getItemLookUpByCdAndId('PI', 11)
    }

    if (difference < params.NR_PRAZO_PARADA_URGENTE * 24) {
      return this.getItemLookUpByCdAndId('PU', 11)
    }

    if (
      (isAfter(datef, dtFinalParadasProgramadas) && isSameYear(datet, addYears(datef, 1))) ||
      // (isBefore(datef, dtFinalParadasProgramadas) && isSameYear(datet, datef))
      (difference >= params.NR_PRAZO_PARADA_URGENTE * 24 && isSameYear(datet, datef))
    ) {
      return this.getItemLookUpByCdAndId('PP', 11)
    }

    if (isBefore(datef, dtFinalParadasAnuais) && isSameYear(datet, addYears(datef, 1))) {
      return this.getItemLookUpByCdAndId('PA', 11)
    }

    if (differenceInYears(datet, datef) === params.NR_PRAZO_PARADA_BIENAL) {
      return this.getItemLookUpByCdAndId('PB', 11)
    }

    //
    return this.getItemLookUpByCdAndId('PL', 11)
  }
}
