import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { Pgi } from '../entities/pgi'

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
  getPgi(numPgi: string): Promise<Pgi>
  getNumPGI(numParada: number): Promise<Pgi>
  savePgi(pgi: Pgi): Promise<Pgi>
}

@injectable()
export class SauPgiRepository implements ISauPgiRepository {
  private readonly sauPgiRepository: Repository<Pgi>

  constructor() {
    this.sauPgiRepository = getRepository(Pgi)
  }

  public getPgi(numPgi: string): Promise<Pgi> {
    return this.sauPgiRepository.findOne({
      where: {
        NUM_PGI: numPgi
      },
      relations: tableRelations
    })
  }
  public getNumPGI(numParada: number): Promise<Pgi> {
    return this.sauPgiRepository.findOne({
      select: ['NUM_PGI'],
      where: {
        CD_PROGRAMACAO_PARADA: numParada
      }
    })
  }

  public savePgi(pgi: Pgi): Promise<Pgi> {
    return this.sauPgiRepository.save(pgi)
  }

  public getAllNumPgi(): Promise<Pgi[]> {
    return this.sauPgiRepository.find({
      select: ['NUM_PGI']
    })
  }
}
