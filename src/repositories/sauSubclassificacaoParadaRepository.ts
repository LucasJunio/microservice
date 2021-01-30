import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SubclassificacaoParada } from '../entities/subclassificacaoParada'
export interface ISauSubClassificacaoParadaRepository {
  getSubClassificacaoParada(cdClassificacao: number, idTipoUsina: string): Promise<SubclassificacaoParada[]>
}

@injectable()
export class SauSubClassificacaoParadaRepository implements ISauSubClassificacaoParadaRepository {
  private readonly sauSubClassificacaoParadaRepository: Repository<SubclassificacaoParada>

  constructor() {
    this.sauSubClassificacaoParadaRepository = getRepository(SubclassificacaoParada)
  }

  public async getSubClassificacaoParada(
    cdClassificacao: number,
    idAplicacaoUsina: string
  ): Promise<SubclassificacaoParada[]> {
    const subClassi = await this.sauSubClassificacaoParadaRepository
      .createQueryBuilder('subClassificacao')
      .leftJoinAndSelect('subClassificacao.idAplicacaoUsina', 'idAplicacaoUsina')
      .leftJoinAndSelect('subClassificacao.cdClassificacaoParada', 'cdClassificacaoParada')
      .andWhere('subClassificacao.cdClassificacaoParada = :cdClassificacao', { cdClassificacao })
      .getMany()
    return subClassi
  }
}
