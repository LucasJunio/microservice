import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { UnidadeGeradora } from '../entities/unidadeGeradora'

export interface ISauUnidadeGeradoraRepository {
  getUnidadesGeradoras(cdUsinaPP: number): Promise<UnidadeGeradora[]>
}

@injectable()
export class SauUnidadeGeradoraRepository implements ISauUnidadeGeradoraRepository {
  private readonly sauUnidadeGeradoraRepository: Repository<UnidadeGeradora>

  constructor() {
    this.sauUnidadeGeradoraRepository = getRepository(UnidadeGeradora)
  }

  public async getUnidadesGeradoras(cdUsinaPP: number): Promise<UnidadeGeradora[]> {
    return this.sauUnidadeGeradoraRepository.find({
      select: ['SG_UNIDADE_GERADORA', 'CD_UNIDADE_GERADORA'],
      where: {
        cdUsina: cdUsinaPP,
        FL_ATIVO: 1
      },
      order: {
        SG_UNIDADE_GERADORA: 'ASC'
      }
    })
  }
}
