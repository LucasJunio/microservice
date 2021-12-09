import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { ParamProgramacaoParadas } from '../entities/paramProgramacaoParadas'

export interface ISauParamProgramacaoParadaRepository {
  getParamProgramacaoParada(year: string): Promise<ParamProgramacaoParadas>
  getNroAnosParadaLongoPrazo(): Promise<ParamProgramacaoParadas[]>
  getParams(dtano: number)
  saveParams(params: ParamProgramacaoParadas)
}

@injectable()
export class SauParamProgramacaoParadaRepository implements ISauParamProgramacaoParadaRepository {
  private readonly sauParamProgramacaoParadaRepository: Repository<ParamProgramacaoParadas>

  constructor() {
    this.sauParamProgramacaoParadaRepository = getRepository(ParamProgramacaoParadas)
  }

  public async saveParams(params: ParamProgramacaoParadas) {
    if (!params.CD_PARAM_PROGRAMACAO_PARADAS) {
      const cdParamProgramacaoParadas = await this.getCdParamProgramacaoParadas()
      params.CD_PARAM_PROGRAMACAO_PARADAS = cdParamProgramacaoParadas[0].ID
      params.USER_CREATE = params.USER_UPDATE
      params.DATE_CREATE = new Date()
    }
    params.DATE_UPDATE = new Date()
    return this.sauParamProgramacaoParadaRepository.save(params)
  }

  public getParams(id: number) {
    return this.sauParamProgramacaoParadaRepository.findOne(id)
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

  public async getCdParamProgramacaoParadas(): Promise<any> {
    return this.sauParamProgramacaoParadaRepository.query(
      'select SAU_PARAM_PROGRAMACAO_PARADAS_S.nextval as id FROM DUAL'
    )
  }
}
