import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_SUBCLASSIFICACAO_PARADA } from '../entities/SAU_SUBCLASSIFICACAO_PARADA'
import { SAU_ITEM_LOOKUP } from '../entities/SAU_ITEM_LOOKUP'

export interface ISauSubClassificacaoParadaRepository {
  getSubClassificacaoParada(cdClassificacao: number, idTipoUsina: string): Promise<SAU_SUBCLASSIFICACAO_PARADA[]>
}

@injectable()
export class SauSubClassificacaoParadaRepository implements ISauSubClassificacaoParadaRepository {
  private readonly sauSubClassificacaoParadaRepository: Repository<SAU_SUBCLASSIFICACAO_PARADA>
  private readonly sauItemLookUpRepository: Repository<SAU_ITEM_LOOKUP>

  constructor() {
    this.sauSubClassificacaoParadaRepository = getRepository(SAU_SUBCLASSIFICACAO_PARADA)
    this.sauItemLookUpRepository = getRepository(SAU_ITEM_LOOKUP)
  }

  public async getSubClassificacaoParada(
    cdClassificacao: number,
    idTipoUsina: string
  ): Promise<SAU_SUBCLASSIFICACAO_PARADA[]> {
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
