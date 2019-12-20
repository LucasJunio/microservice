import { inject, injectable } from 'inversify'
import { SauClassificacaoParadaRepository } from '../../../repositories/sauClassificacaoParadaRepository'
import { SAU_CLASSIFICACAO_PARADA } from '../../../entities/SAU_CLASSIFICACAO_PARADA'
import { TYPE } from '../../../constants/types'
import { SAU_PARAM_PROGRAMACAO_PARADAS } from '../../../entities/SAU_PARAM_PROGRAMACAO_PARADAS'
import { SauParamProgramacaoParadaRepository } from '../../../repositories/sauParamProgramacaoParadaRepository'

export interface IParadaProgramadaService {
  getClassificacoesParada(sgUsina: string): Promise<SAU_CLASSIFICACAO_PARADA[]>
  getParamProgramacaoParada(year: string): Promise<SAU_PARAM_PROGRAMACAO_PARADAS>
}

@injectable()
export class ParadaProgramadaService implements IParadaProgramadaService {
  @inject(TYPE.SauClassificacaoParadaRepository)
  private readonly sauClassificacaoParadaRepository: SauClassificacaoParadaRepository

  @inject(TYPE.SauParamProgramacaoParadaRepository)
  private readonly sauParamProgramacaoParadaRepository: SauParamProgramacaoParadaRepository

  public getClassificacoesParada(sgUsina: string): Promise<SAU_CLASSIFICACAO_PARADA[]> {
    return this.sauClassificacaoParadaRepository.getClassificacoesParada(sgUsina)
  }

  public getParamProgramacaoParada(year: string): Promise<SAU_PARAM_PROGRAMACAO_PARADAS> {
    return this.sauParamProgramacaoParadaRepository.getParamProgramacaoParada(year)
  }
}
