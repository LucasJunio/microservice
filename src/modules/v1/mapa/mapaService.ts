import { inject, injectable } from 'inversify'

import { TYPE } from '../../../constants/types'
import { SauConsultaMapaPpRepository } from '../../../repositories/sauConsultaMapaPpRepository'

export interface IMapaService {
  getParadas(): Promise<any>
}

@injectable()
export class MapaService implements IMapaService {
  @inject(TYPE.SauConsultaMapaPpRepository)
  private readonly sauConsultaMapaPpRepository: SauConsultaMapaPpRepository

  public async getParadas(): Promise<any> {
    return this.sauConsultaMapaPpRepository.getAll()
  }
}
