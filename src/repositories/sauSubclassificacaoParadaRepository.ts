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
    return this.sauSubClassificacaoParadaRepository.find({
      select: ['CD_SUBCLASSIFICACAO_PARADA', 'DS_SUBCLASSIFICACAO_PARADA', 'CD_APLICACAO_USINA'],
      where: [
        {
          FL_ATIVO: 1,
          cdClassificacaoParada: cdClassificacao,
          CD_APLICACAO_USINA: idTipoUsina
        },
        {
          CD_APLICACAO_USINA: 'A'
        }
      ],
      order: {
        CD_SUBCLASSIFICACAO_PARADA: 'ASC'
      }
    })
  }
}
