import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_PROGRAMACAO_PARADA } from '../entities/SAU_PROGRAMACAO_PARADA'

const tableRelations = [
  'cdClassificacaoProgrParada',
  'idTipoParada',
  'idStatus',
  'idTipoProgramacao',
  'idStatusCancelamento',
  'idStatusReprogramacao',
  'idOrigemReprogramacao',
  'idMotivoReprogramacao'
]

export interface ISauProgramacaoParadaRepository {
  saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA>
  getById(id: number): Promise<SAU_PROGRAMACAO_PARADA>
  getAll(): Promise<SAU_PROGRAMACAO_PARADA[]>
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

  public getById(id: number): Promise<SAU_PROGRAMACAO_PARADA> {
    return this.sauProgramacaoParadaRepository.findOne(id, {
      relations: tableRelations
    })
  }

  public getAll(): Promise<SAU_PROGRAMACAO_PARADA[]> {
    return this.sauProgramacaoParadaRepository.find({
      relations: tableRelations
    })
  }
}
