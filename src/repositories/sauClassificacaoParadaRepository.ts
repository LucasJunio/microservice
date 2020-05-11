import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { ClassificacaoParada } from '../entities/classificacaoParada'
import { Usina } from '../entities/usina'

export interface ISauClassificacaoParadaRepository {
  getClassificacoesParada(sgUsina: string): Promise<ClassificacaoParada[]>
}

@injectable()
export class SauClassificacaoParadaRepository implements ISauClassificacaoParadaRepository {
  private readonly sauClassificacaoParadaRepository: Repository<ClassificacaoParada>

  constructor() {
    this.sauClassificacaoParadaRepository = getRepository(ClassificacaoParada)
  }

  public async getClassificacoesParada(sgUsina: string): Promise<ClassificacaoParada[]> {
    return this.sauClassificacaoParadaRepository
      .createQueryBuilder()
      .select(['CD_CLASSIFICACAO_PARADA', 'DS_CLASSIFICACAO_PARADA', 'ID_APLICACAO_PARADA', 'ID_ITEM_LOOKUP'])
      .where('ClassificacaoParada.FL_ATIVO = 1')
      .innerJoin('ClassificacaoParada.idAplicacaoParada', 'id_aplicacao_parada')
      .andWhere("ID_ITEM_LOOKUP = 'A'")
      .orWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select('ID_TIPO_USINA')
          .from(Usina, 'SAU_USINA')
          .where('SG_USINA = :sgUsina', { sgUsina })
          .getQuery()
        return 'ID_ITEM_LOOKUP IN ' + subQuery
      })
      .orderBy('ClassificacaoParada.CD_CLASSIFICACAO_PARADA')
      .getRawMany()
  }
}
