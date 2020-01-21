import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_PROGRAMACAO_PARADA } from '../entities/SAU_PROGRAMACAO_PARADA'

const tableRelations = [
  'cdUsina',
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
  getLastIdSeqParada(cdParada: number): Promise<SAU_PROGRAMACAO_PARADA[]>
  getLastIdParada(): Promise<SAU_PROGRAMACAO_PARADA[]>
}

@injectable()
export class SauProgramacaoParadaRepository implements ISauProgramacaoParadaRepository {
  private readonly sauProgramacaoParadaRepository: Repository<SAU_PROGRAMACAO_PARADA>

  constructor() {
    this.sauProgramacaoParadaRepository = getRepository(SAU_PROGRAMACAO_PARADA)
  }

  public async saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    const programacaoParadaToSave = programcaoParada

    if(!programcaoParada.CD_PROGRAMACAO_PARADA) {
      const idParada = await this.getParadaSeq()
      programacaoParadaToSave.CD_PROGRAMACAO_PARADA = idParada[0].ID;
    }
    return this.sauProgramacaoParadaRepository.save(programacaoParadaToSave)
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

  public getLastIdSeqParada(cdParada: number): Promise<SAU_PROGRAMACAO_PARADA[]> {
    return this.sauProgramacaoParadaRepository.find({
      select: ['CD_SEQ_PARADA'],
      where: {
        CD_PROGRAMACAO_PARADA: cdParada
      },
      order: {
        CD_SEQ_PARADA: 'DESC'
      },
      take: 1
    })
  }

  public getLastIdParada(): Promise<SAU_PROGRAMACAO_PARADA[]> {
    return this.sauProgramacaoParadaRepository.find({
      select: ['CD_PARADA'],
      order: {
        CD_PARADA: 'DESC',
        CD_PROGRAMACAO_PARADA: 'DESC'
      },
      take: 1
    })
  }

  public async getParadaSeq(): Promise<any> {
    return this.sauProgramacaoParadaRepository.query(
      "select SAU_PROGRAMACAO_PARADA_S.nextval as id FROM DUAL"
    )
  }
}
