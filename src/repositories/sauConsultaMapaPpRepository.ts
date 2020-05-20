import { injectable } from 'inversify'
import { getRepository, Repository } from 'typeorm'
import { PpConsultaDto } from '../entities/ppConsultaDto'
import { ConsultaMapaPPV } from '../entities/consultaMapaPPV'

export interface ISauConsultaMapaPpRepository {
  getAll(): Promise<ConsultaMapaPPV[]>
}

@injectable()
export class SauConsultaMapaPpRepository implements ISauConsultaMapaPpRepository {
  private readonly sauConsultaMapaPpRepository: Repository<ConsultaMapaPPV>

  constructor() {
    this.sauConsultaMapaPpRepository = getRepository(ConsultaMapaPPV)
  }

  public async getAll(): Promise<ConsultaMapaPPV[]> {
    return this.sauConsultaMapaPpRepository.find({
      join: {
        alias: 'mapaPp'
      }
    })
  }
}
