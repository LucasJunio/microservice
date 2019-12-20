import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_PROGRAMACAO_PARADA } from '../entities/SAU_PROGRAMACAO_PARADA'

export interface ISauProgramacaoParadaRepository {
  saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA>
}

@injectable()
export class SauProgramacaoParadaRepository implements ISauProgramacaoParadaRepository {
  private readonly sauProgramacaoParadaRepository: Repository<SAU_PROGRAMACAO_PARADA>

  constructor() {
    this.sauProgramacaoParadaRepository = getRepository(SAU_PROGRAMACAO_PARADA)
  }

  public async saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    return this.sauProgramacaoParadaRepository.save(programcaoParada)
  }
}
