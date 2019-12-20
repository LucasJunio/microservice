import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_PGI } from '../entities/SAU_PGI'

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
      }
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
}
