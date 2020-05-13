import { inject, injectable } from 'inversify'
import { TYPE } from '../../../constants/types'
import { SauParamProgramacaoParadaRepository } from '../../../repositories/sauParamProgramacaoParadaRepository'
import { ParamProgramacaoParadas } from '../../../entities/paramProgramacaoParadas'

export interface IParamsService {
  saveParams(params: ParamProgramacaoParadas)
}

@injectable()
export class ParamsService implements IParamsService {
  @inject(TYPE.SauParamProgramacaoParadaRepository)
  private readonly sauParamProgramacaoParadaRepository: SauParamProgramacaoParadaRepository

  public saveParams(params: ParamProgramacaoParadas) {
    return this.sauParamProgramacaoParadaRepository.saveParams(params)
  }

  public getParams(dtano: number) {
    return this.sauParamProgramacaoParadaRepository.getParams(dtano)
  }
}
