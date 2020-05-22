import { inject, injectable } from 'inversify'

import { TYPE } from '../../../constants/types'
import { SauConsultaMapaPpRepository } from '../../../repositories/sauConsultaMapaPpRepository'
import ConsultaMapaPpVDto from '../../../entities/consultaMapaPpVDto'

export interface IMapaService {
  getParadas(filter: ConsultaMapaPpVDto): Promise<ConsultaMapaPpVDto>
}

@injectable()
export class MapaService implements IMapaService {
  @inject(TYPE.SauConsultaMapaPpRepository)
  private readonly sauConsultaMapaPpRepository: SauConsultaMapaPpRepository

  public async getParadas(filter: ConsultaMapaPpVDto): Promise<ConsultaMapaPpVDto> {
    return this.sauConsultaMapaPpRepository.getAll(filter)
  }
}
