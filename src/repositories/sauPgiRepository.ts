import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_PGI } from '../entities/SAU_PGI'

const tableRelations = [
  'cdUnidadeGeradora',
  'idStatus',
  'cdAgenteSolic',
  'cdAgenteResp',
  'idTipoCadastro',
  'idClassifiIntervencao',
  'cdProgramacaoParada',
  'idTempoRetorno',
  'idPeriodicidade',
  'idNatureza',
  'idTipo',
  'idCaracterizacao'
]

export interface ISauPgiRepository {
  getPgi(numPgi: string): Promise<SAU_PGI>
  getNumPGI(numParada: number): Promise<SAU_PGI>
  savePgi(pgi: SAU_PGI): Promise<SAU_PGI>
}

@injectable()
export class SauPgiRepository implements ISauPgiRepository {
  private readonly sauPgiRepository: Repository<SAU_PGI>

  constructor() {
    this.sauPgiRepository = getRepository(SAU_PGI)
  }

  public getPgi(numPgi: string): Promise<SAU_PGI> {
    return this.sauPgiRepository.findOne({
      where: {
        NUM_PGI: numPgi
      },
      relations: tableRelations
    })
  }
  public getNumPGI(numParada: number): Promise<SAU_PGI> {
    return this.sauPgiRepository.findOne({
      select: ['NUM_PGI'],
      where: {
        CD_PROGRAMACAO_PARADA: numParada
      }
    })
  }

  public savePgi(pgi: SAU_PGI): Promise<SAU_PGI> {
    return this.sauPgiRepository.save(pgi)
  }

  public getAllNumPgi(): Promise<SAU_PGI[]> {
    return this.sauPgiRepository.find({
      select: ['NUM_PGI']
    })
  }
}
