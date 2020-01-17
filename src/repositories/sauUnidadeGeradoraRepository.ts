import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_UNIDADE_GERADORA } from '../entities/SAU_UNIDADE_GERADORA'

export interface ISauUnidadeGeradoraRepository {
  getUnidadesGeradoras(cdUsinaPP: number): Promise<SAU_UNIDADE_GERADORA[]>
}

@injectable()
export class SauUnidadeGeradoraRepository implements ISauUnidadeGeradoraRepository {
  private readonly sauUnidadeGeradoraRepository: Repository<SAU_UNIDADE_GERADORA>

  constructor() {
    this.sauUnidadeGeradoraRepository = getRepository(SAU_UNIDADE_GERADORA)
  }

  public async getUnidadesGeradoras(cdUsinaPP: number): Promise<SAU_UNIDADE_GERADORA[]> {
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
