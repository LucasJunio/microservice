import { inject, injectable } from 'inversify'
import { SAU_USINA } from '../../../entities/SAU_USINA'
import { TYPE } from '../../../constants/types'
import { SauUsinaRepository } from '../../../repositories/sauUsinaRepository'

export interface IUsinaService {
  getUsinas(): Promise<SAU_USINA[]>
}

@injectable()
export class UsinaService implements IUsinaService {
  @inject(TYPE.SauUsinaRepository)
  private readonly sauUsinaRepository: SauUsinaRepository

  public getUsinas(): Promise<SAU_USINA[]> {
    return this.sauUsinaRepository.getUsinas()
  }
}
