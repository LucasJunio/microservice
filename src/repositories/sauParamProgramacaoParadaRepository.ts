import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { ParamProgramacaoParadas } from '../entities/paramProgramacaoParadas'

export interface ISauParamProgramacaoParadaRepository {
  getParamProgramacaoParada(year: string): Promise<ParamProgramacaoParadas>
  getNroAnosParadaLongoPrazo(): Promise<ParamProgramacaoParadas[]>
}

@injectable()
export class SauParamProgramacaoParadaRepository implements ISauParamProgramacaoParadaRepository {
  private readonly sauParamProgramacaoParadaRepository: Repository<ParamProgramacaoParadas>

  constructor() {
    this.sauParamProgramacaoParadaRepository = getRepository(ParamProgramacaoParadas)
  }

  public getParamProgramacaoParada(year: string): Promise<ParamProgramacaoParadas> {
    return this.sauParamProgramacaoParadaRepository
      .createQueryBuilder()
      .select(['dt_final_paradas_anuais', 'dt_final_paradas_programada', 'nr_prazo_parada_urgente'])
      .where("TO_CHAR(dt_ano,'YYYY') = :year", { year })
      .getRawOne()
  }

  public getNroAnosParadaLongoPrazo(): Promise<ParamProgramacaoParadas[]> {
    return this.sauParamProgramacaoParadaRepository.find({
      select: ['NR_ANOS_PARADA_LONGO_PRAZO'],
      take: 1
    })
  }
}
