import { inject, injectable } from 'inversify'
import { Usina } from '../../../entities/usina'
import { TYPE } from '../../../constants/types'
import { SauUsinaRepository } from '../../../repositories/sauUsinaRepository'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'

export interface IUsinaService {
  getUsinas(): Promise<Usina[]>
  getUsinasAll(): Promise<Usina[]>
}

@injectable()
export class UsinaService implements IUsinaService {
  @inject(TYPE.SauUsinaRepository)
  private readonly sauUsinaRepository: SauUsinaRepository

  @inject(TYPE.SauItemLookUpRepository)
  private readonly sauItemLookupRepository: SauItemLookUpRepository

  public getUsinas(): Promise<Usina[]> {
    return this.sauUsinaRepository.getUsinas()
  }

  public async getUsinasAll(): Promise<Usina[]> {
    const itemLookUp = await this.sauItemLookupRepository.getItemLookUpByIdLookupAndIdItemLookup('TIPO_USINA', 'E')
    return this.sauUsinaRepository.getUsinasAll(itemLookUp)
  }
}
