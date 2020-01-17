import { inject, injectable } from 'inversify'
import { TYPE } from '../../../constants/types'
import { SauUnidadeGeradoraRepository } from '../../../repositories/sauUnidadeGeradoraRepository'
import { SAU_UNIDADE_GERADORA } from '../../../entities/SAU_UNIDADE_GERADORA'

export interface IUnidadeGeradoraService {
  getUnidadesGeradoras(cdUsinaPP: number): Promise<SAU_UNIDADE_GERADORA[]>
}

@injectable()
export class UnidadeGeradoraService implements IUnidadeGeradoraService {
  @inject(TYPE.SauUnidadeGeradoraRepository)
  private readonly sauUnidadeGeradoraRepository: SauUnidadeGeradoraRepository

  public getUnidadesGeradoras(cdUsinaPP: number): Promise<SAU_UNIDADE_GERADORA[]> {
    return this.sauUnidadeGeradoraRepository.getUnidadesGeradoras(cdUsinaPP)
  }
}
