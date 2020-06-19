import { inject, injectable } from 'inversify'

import { TYPE } from '../../../constants/types'
import { SauConsultaMapaPpRepository } from '../../../repositories/sauConsultaMapaPpRepository'
import { SauConsultaMapaPgiRepository } from '../../../repositories/sauConsultaMapaPgiRepository'
import ConsultaMapaVDto from '../../../entities/consultaMapaVDto'

export interface IMapaService {
  getParadas(filter: ConsultaMapaVDto): Promise<ConsultaMapaVDto>
  getDi(filter: ConsultaMapaVDto): Promise<ConsultaMapaVDto>
  getParadasDi(filter: ConsultaMapaVDto): Promise<ConsultaMapaVDto>
}

@injectable()
export class MapaService implements IMapaService {
  @inject(TYPE.SauConsultaMapaPpRepository)
  private readonly sauConsultaMapaPpRepository: SauConsultaMapaPpRepository

  @inject(TYPE.SauConsultaMapaPgiRepository)
  private readonly sauConsultaMapaPgiRepository: SauConsultaMapaPgiRepository

  public async getParadas(filter: ConsultaMapaVDto): Promise<ConsultaMapaVDto> {
    return this.sauConsultaMapaPpRepository.getAll(filter)
  }

  public async getDi(filter: ConsultaMapaVDto): Promise<ConsultaMapaVDto> {
    return this.sauConsultaMapaPgiRepository.getAll(filter)
  }

  public async getParadasDi(filter: ConsultaMapaVDto): Promise<ConsultaMapaVDto> {
    filter = await this.sauConsultaMapaPgiRepository.getAll(filter)
    return this.sauConsultaMapaPpRepository.getAll(filter)
  }
}
