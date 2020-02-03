import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_SUBCLASSIFICACAO_PARADA } from '../entities/SAU_SUBCLASSIFICACAO_PARADA'

export interface ISauSubClassificacaoParadaRepository {
  getSubClassificacaoParada(cdClassificacao: number, idTipoUsina: string): Promise<SAU_SUBCLASSIFICACAO_PARADA[]>
}

@injectable()
export class SauSubClassificacaoParadaRepository implements ISauSubClassificacaoParadaRepository {
  private readonly sauSubClassificacaoParadaRepository: Repository<SAU_SUBCLASSIFICACAO_PARADA>

  constructor() {
    this.sauSubClassificacaoParadaRepository = getRepository(SAU_SUBCLASSIFICACAO_PARADA)
  }

  public getSubClassificacaoParada(
    cdClassificacao: number,
    idTipoUsina: string
  ): Promise<SAU_SUBCLASSIFICACAO_PARADA[]> {

    this.sauSubClassificacaoParadaRepository.find({
      select: ['CD_SUBCLASSIFICACAO_PARADA', 'DS_SUBCLASSIFICACAO_PARADA', 'idAplicacaoUsina'],
      relations: [
        'idAplicacaoUsina'
      ],
      where: [
        {
          FL_ATIVO: 1,
          cdClassificacaoParada: cdClassificacao,
          // idAplicacaoUsina: {
          //   ID_ITEM_LOOKUP: idTipoUsina
          // }
        },
        {
          idAplicacaoUsina: {
            ID_ITEM_LOOKUP: 'A'
          }
        }
      ],
      order: {
        DS_SUBCLASSIFICACAO_PARADA: 'ASC'
      }
    }).then(resp => console.log(resp))

    return this.sauSubClassificacaoParadaRepository.find({
      // select: ['CD_SUBCLASSIFICACAO_PARADA', 'DS_SUBCLASSIFICACAO_PARADA', 'ID_APLICACAO_USINA'],
    })
  }
}
