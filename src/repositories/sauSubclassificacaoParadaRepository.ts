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
    idTipoUsina: string
  ): Promise<SubclassificacaoParada[]> {
    // const itemLookupUsina = await this.sauItemLookUpRepository.findOne({
    //   select: ['ID_ITEM_LOOKUP', 'DS_ITEM_LOOKUP', 'CD_ITEM_LOOKUP'],
    //   where: {
    //     ID_ITEM_LOOKUP: idTipoUsina,
    //     CD_LOOKUP: 19 // tipo usinas
    //   }
    // })

    // const subClassi = await this.sauSubClassificacaoParadaRepository
    //   .createQueryBuilder('subClassificacao')
    //   .where('subClassificacao.FL_ATIVO = 1')
    //   // .leftJoinAndSelect('subClassificacao.idAplicacaoUsina', 'idAplicacaoUsina')
    //   .andWhere('subClassificacao.cdClassificacaoParada = :cdClassificacao', { cdClassificacao })
    //   .andWhere('subClassificacao.idAplicacaoUsina = :idAplicacaoUsina', {
    //     idAplicacaoUsina: itemLookupUsina.CD_ITEM_LOOKUP
    //   })
    //   .getMany()

    return this.sauSubClassificacaoParadaRepository.find({
      // select: ['CD_SUBCLASSIFICACAO_PARADA', 'DS_SUBCLASSIFICACAO_PARADA', 'ID_APLICACAO_USINA'],
    })
  }
}
