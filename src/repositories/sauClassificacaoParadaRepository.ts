import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_CLASSIFICACAO_PARADA } from '../entities/SAU_CLASSIFICACAO_PARADA'
import { SAU_USINA } from '../entities/SAU_USINA'

export interface ISauClassificacaoParadaRepository {
  getClassificacoesParada(sgUsina: string): Promise<SAU_CLASSIFICACAO_PARADA[]>
}

@injectable()
export class SauClassificacaoParadaRepository implements ISauClassificacaoParadaRepository {
  private readonly sauClassificacaoParadaRepository: Repository<SAU_CLASSIFICACAO_PARADA>

  constructor() {
    this.sauClassificacaoParadaRepository = getRepository(SAU_CLASSIFICACAO_PARADA)
  }

  public async getClassificacoesParada(sgUsina: string): Promise<SAU_CLASSIFICACAO_PARADA[]> {
    return this.sauClassificacaoParadaRepository
      .createQueryBuilder()
      .select(['CD_CLASSIFICACAO_PARADA', 'DS_CLASSIFICACAO_PARADA'])
      .where('FL_ATIVO = 1')
      .andWhere("CD_CLASSIFICACAO_PARADA = 'A'")
      .orWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select('ID_TIPO_USINA')
          .from(SAU_USINA, 'SAU_USINA')
          .where('SG_USINA = :sgUsina', { sgUsina })
          .getQuery()
        return 'CD_APLICACAO_PARADA IN ' + subQuery
      })
      .orderBy('CD_CLASSIFICACAO_PARADA')
      .getMany()
  }
}
