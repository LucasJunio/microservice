import { inject, injectable } from 'inversify'
import { Usina } from '../../../entities/usina'
import { TYPE } from '../../../constants/types'
import { SauUsinaRepository } from '../../../repositories/sauUsinaRepository'

export interface IUsinaService {
  getUsinas(): Promise<Usina[]>
}

@injectable()
export class UsinaService implements IUsinaService {
  @inject(TYPE.SauUsinaRepository)
  private readonly sauUsinaRepository: SauUsinaRepository

  public getUsinas(): Promise<Usina[]> {
    return this.sauUsinaRepository.getUsinas()
  }
}
