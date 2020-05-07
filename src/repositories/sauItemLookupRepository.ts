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
    // datef = data do cadastro
    // datet = data inicio previsto

    if (difference <= 24) {
      // Diferença < 24 horas intempestiva
      return this.getItemLookUpByCdAndId('PI', 11)
    }

    if (difference < params.NR_PRAZO_PARADA_URGENTE * 24) {
      // Diferença < 48 horas Urgente
      return this.getItemLookUpByCdAndId('PU', 11)
    }

    // caso datef ser antes de 31/08, datef e datet mesmo ano
    // || caso datef ser depois de 31/08 datet tem que ser ano de datef +1
    // data final parada programada
    if (
      // (isBefore(datef, dtFinalParadasProgramadas) && isSameYear(datef, datet))
      //  || as 2 condições nao tem como acontecer juntas
      isAfter(datef, dtFinalParadasProgramadas) &&
      isSameYear(datet, addYears(datef, 1))
    ) {
      return this.getItemLookUpByCdAndId('PP', 11)
    }

    // caso datef ser antes de 30/08 e datet for o ano de datef + 1
    // datef +  NR_ANOS_PARADA_LONGO_PRAZO > datet
    if (
      isBefore(datef, dtFinalParadasAnuais) &&
      isSameYear(datet, addYears(datef, params.NR_ANOS_PARADA_LONGO_PRAZO))
    ) {
      return this.getItemLookUpByCdAndId('PA', 11)
    }

    if (differenceInYears(datet, datef) <= 2) {
      return this.getItemLookUpByCdAndId('PB', 11)
    }

    // datef +  NR_ANOS_PARADA_LONGO_PRAZO <= datet
    return this.getItemLookUpByCdAndId('PL', 11)
  }
}
