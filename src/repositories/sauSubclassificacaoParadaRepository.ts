import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SubclassificacaoParada } from '../entities/subclassificacaoParada'
// import { TemLookup } from '../entities/TemLookup'

export interface ISauSubClassificacaoParadaRepository {
  getSubClassificacaoParada(cdClassificacao: number, idTipoUsina: string): Promise<SubclassificacaoParada[]>
}

@injectable()
export class SauSubClassificacaoParadaRepository implements ISauSubClassificacaoParadaRepository {
  private readonly sauSubClassificacaoParadaRepository: Repository<SubclassificacaoParada>
  // private readonly sauItemLookUpRepository: Repository<TemLookup>

  constructor() {
    this.sauSubClassificacaoParadaRepository = getRepository(SubclassificacaoParada)
    // this.sauItemLookUpRepository = getRepository(TemLookup)
  }

  public async getSubClassificacaoParada(
    cdClassificacao: number,
    idAplicacaoUsina: string
  ): Promise<SubclassificacaoParada[]> {
    const subClassi = await this.sauSubClassificacaoParadaRepository
      .createQueryBuilder('subClassificacao')
      // .where('subClassificacao.FL_ATIVO = 1')
      .leftJoinAndSelect('subClassificacao.idAplicacaoUsina', 'idAplicacaoUsina')
      .leftJoinAndSelect('subClassificacao.cdClassificacaoParada', 'cdClassificacaoParada')
      .andWhere('subClassificacao.cdClassificacaoParada = :cdClassificacao', { cdClassificacao })
      // .andWhere('idAplicacaoUsina.ID_ITEM_LOOKUP = :idAplicacaoUsina', { idAplicacaoUsina })
      // .andWhere('subClassificacao.idAplicacaoUsina = :idAplicacaoUsina', {
      //   idAplicacaoUsina: itemLookupUsina.CD_ITEM_LOOKUP
      // })
      .getMany()
    return subClassi
  }
}
