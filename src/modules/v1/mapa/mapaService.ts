import { inject, injectable } from 'inversify'

import { TYPE } from '../../../constants/types'
import { SauConsultaMapaPpRepository } from '../../../repositories/sauConsultaMapaPpRepository'
import { SauConsultaMapaPgiRepository } from '../../../repositories/sauConsultaMapaPgiRepository'
import { SauUsinaRepository } from '../../../repositories/sauUsinaRepository'
import ConsultaMapaVDto from '../../../entities/consultaMapaVDto'

export interface IMapaService {
  getParadas(filterDto: ConsultaMapaVDto): Promise<ConsultaMapaVDto>
  getDi(filterDto: ConsultaMapaVDto): Promise<ConsultaMapaVDto>
  getParadasDi(filterDto: ConsultaMapaVDto): Promise<ConsultaMapaVDto>
}

@injectable()
export class MapaService implements IMapaService {
  @inject(TYPE.SauConsultaMapaPpRepository)
  private readonly sauConsultaMapaPpRepository: SauConsultaMapaPpRepository

  @inject(TYPE.SauConsultaMapaPgiRepository)
  private readonly sauConsultaMapaPgiRepository: SauConsultaMapaPgiRepository

  @inject(TYPE.SauUsinaRepository)
  private readonly sauUsinaRepository: SauUsinaRepository

  public async getParadas(filterDto: ConsultaMapaVDto): Promise<ConsultaMapaVDto> {
    return this.sauConsultaMapaPpRepository.getAll(filterDto)
  }

  public async getDi(filterDto: ConsultaMapaVDto): Promise<ConsultaMapaVDto> {
    return this.sauConsultaMapaPgiRepository.getAll(filterDto)
  }

  public async getParadasDi(filterDto: ConsultaMapaVDto): Promise<ConsultaMapaVDto> {
    filterDto = await this.sauConsultaMapaPgiRepository.getAll(filterDto)
    return this.sauConsultaMapaPpRepository.getAll(filterDto)
  }
}
