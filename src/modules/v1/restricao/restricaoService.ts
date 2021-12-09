import { inject, injectable } from 'inversify'
import { TYPE } from '../../../constants/types'
import { SauGrupoRestricaoRepository } from '../../../repositories/sauRestricaoRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'
import { GrupoRestricao } from '../../../entities/grupoRestricao'
import { ProgramacaoParada } from '../../../entities/programacaoParada'

export interface IRestricaoService {
  getRestricoesByUsina(cdUsina: number): Promise<GrupoRestricao[]>
  getConflictingPp(params: any): Promise<ProgramacaoParada[]>
}

@injectable()
export class RestricaoService implements IRestricaoService {
  @inject(TYPE.RestricaoRepository)
  private readonly restricaoRepository: SauGrupoRestricaoRepository

  @inject(TYPE.SauProgramacaoParadaRepository)
  private readonly programacaoParadaRepository: SauProgramacaoParadaRepository

  public getRestricoesByUsina(cdUsina: number): Promise<GrupoRestricao[]> {
    return this.restricaoRepository.getRestricoesByUsina(cdUsina)
  }

  public getConflictingPp(params: any): Promise<ProgramacaoParada[]> {
    return this.programacaoParadaRepository.getConflictingPp(params)
  }
}
