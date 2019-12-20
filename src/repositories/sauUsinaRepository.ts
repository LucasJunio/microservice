import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_USINA } from '../entities/SAU_USINA'

export interface ISauUsinaRepository {
  getUsinas(): Promise<SAU_USINA[]>
}

@injectable()
export class SauUsinaRepository implements ISauUsinaRepository {
  private readonly sauUsinaRepository: Repository<SAU_USINA>

  constructor() {
    this.sauUsinaRepository = getRepository(SAU_USINA)
  }

  public async getUsinas(): Promise<SAU_USINA[]> {
    return this.sauUsinaRepository.find({
      select: ['SG_USINA', 'CD_USINA', 'ID_TIPO_USINA'],
      where: {
        FL_ATIVO: 1
      },
      order: {
        SG_USINA: 'ASC'
      }
    })
  }
}
