import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_PARAM_PROGRAMACAO_PARADAS } from '../entities/SAU_PARAM_PROGRAMACAO_PARADAS'

export interface ISauParamProgramacaoParadaRepository {
  getParamProgramacaoParada(year: string): Promise<SAU_PARAM_PROGRAMACAO_PARADAS>
  getNroAnosParadaLongoPrazo(): Promise<SAU_PARAM_PROGRAMACAO_PARADAS[]>
}

@injectable()
export class SauParamProgramacaoParadaRepository implements ISauParamProgramacaoParadaRepository {
  private readonly sauParamProgramacaoParadaRepository: Repository<SAU_PARAM_PROGRAMACAO_PARADAS>

  constructor() {
    this.sauParamProgramacaoParadaRepository = getRepository(SAU_PARAM_PROGRAMACAO_PARADAS)
  }

  public async getParamProgramacaoParada(year: string): Promise<SAU_PARAM_PROGRAMACAO_PARADAS> {
    return this.sauParamProgramacaoParadaRepository
      .createQueryBuilder()
      .select(['dt_final_paradas_anuais', 'dt_final_paradas_programada', 'nr_prazo_parada_urgente'])
      .where("TO_CHAR(a.dt_ano,'YYYY') = :year", { year })
      .getOne()
  }

  public getNroAnosParadaLongoPrazo(): Promise<SAU_PARAM_PROGRAMACAO_PARADAS[]> {
    return this.sauParamProgramacaoParadaRepository.find({
      select: ['NR_ANOS_PARADA_LONGO_PRAZO'],
      take: 1
    })
  }
}
