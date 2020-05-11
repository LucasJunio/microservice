import { inject, injectable } from 'inversify'
import { TYPE } from '../../../constants/types'
import { SauUnidadeGeradoraRepository } from '../../../repositories/sauUnidadeGeradoraRepository'
import { UnidadeGeradora } from '../../../entities/unidadeGeradora'

export interface IUnidadeGeradoraService {
  getUnidadesGeradoras(cdUsinaPP: number): Promise<UnidadeGeradora[]>
}

@injectable()
export class UnidadeGeradoraService implements IUnidadeGeradoraService {
  @inject(TYPE.SauUnidadeGeradoraRepository)
  private readonly sauUnidadeGeradoraRepository: SauUnidadeGeradoraRepository

  public getUnidadesGeradoras(cdUsinaPP: number): Promise<UnidadeGeradora[]> {
    return this.sauUnidadeGeradoraRepository.getUnidadesGeradoras(cdUsinaPP)
  }
}
