import { injectable } from 'inversify'
import { Repository, getRepository, EntityRepository } from 'typeorm'
import { ProgramacaoParada } from '../entities/programacaoParada'
import { Usina } from '../entities/usina'

const tableRelations = [
  'sauProgramacaoParadaUgs',
  'cdClassificacaoProgrParada',
  'cdSubclassifProgrParada',
  'idTipoParada',
  'idStatus',
  'idTipoProgramacao',
  'idStatusCancelamento',
  'idStatusReprogramacao',
  'cdClassifReprogrParada',
  'cdSubclasReprogrParada',
  'sauPgis',

  'sauPgis.idStatus',
  'sauProgramacaoParadaUgs.cdUnidadeGeradora'
]

export interface ISauProgramacaoParadaRepository {
  saveProgramacaoParada(programcaoParada: ProgramacaoParada): Promise<ProgramacaoParada>
  getById(id: number): Promise<ProgramacaoParada>
  getAll(): Promise<ProgramacaoParada[]>
  // getLastIdSeqParada(cdParada: number): Promise<ProgramacaoParada[]>
  getLastIdParada(): Promise<ProgramacaoParada[]>
}

@injectable()
@EntityRepository(ProgramacaoParada)
export class SauProgramacaoParadaRepository implements ISauProgramacaoParadaRepository {
  public readonly sauProgramacaoParadaRepository: Repository<ProgramacaoParada>
  private readonly sauUsinaRepository: Repository<Usina>

  constructor() {
    this.sauProgramacaoParadaRepository = getRepository(ProgramacaoParada)
    this.sauUsinaRepository = getRepository(Usina)
  }

  public async saveProgramacaoParada(programcaoParada: ProgramacaoParada): Promise<ProgramacaoParada> {
    if (!programcaoParada.CD_PROGRAMACAO_PARADA) {
      const idParada = await this.getParadaSeq()
      programcaoParada.CD_PROGRAMACAO_PARADA = idParada[0].ID
    }
    return this.sauProgramacaoParadaRepository.save(programcaoParada)
  }

  public getAll(): Promise<ProgramacaoParada[]> {
    return this.sauProgramacaoParadaRepository.find({
      relations: tableRelations
    })
  }

  public deletePp(id): Promise<any> {
    return this.sauProgramacaoParadaRepository.delete(id)
  }

  public getLastIdParada(): Promise<any[]> {
    return this.sauProgramacaoParadaRepository.query('select SAU_PARADA_S.nextval as id FROM DUAL')
  }

  public async getParadaSeq(): Promise<any> {
    return this.sauProgramacaoParadaRepository.query('select SAU_PROGRAMACAO_PARADA_S.nextval as id FROM DUAL')
  }

  public async getById(id: number): Promise<ProgramacaoParada> {
    const pp = await this.sauProgramacaoParadaRepository.findOne(id, {
      relations: tableRelations,
      join: {
        alias: 'pp'
      }
    })
    const usina = await this.getUsinaByCdAndId(pp.CD_CONJUNTO_USINA, pp.ID_CONJUNTO_USINA)
    pp.usina = usina[0]

    return pp
  }

  public getUsinaByCdAndId(cdConjuntoUsina: number, idConjuntoUsina: string): Promise<Usina> {
    if (idConjuntoUsina === 'U') {
      return this.sauUsinaRepository.query(
        `SELECT sg_usina sg_conjunto_usina,
          cd_usina cd_conjunto_usina,
          'U'      id_conjunto_usina
        FROM sau_usina
        WHERE fl_ativo = 1 AND cd_usina = ${cdConjuntoUsina}
        ORDER BY 1
        `
      )
    }

    return this.sauUsinaRepository.query(
      `SELECT scu.sg_conjunto sg_conjunto_usina,
        scu.cd_conjunto cd_conjunto_usina,
        'C'             id_conjunto_usina
      FROM sau_conjunto_usina scu
      WHERE scu.fl_ativo = 1 
      AND scu.cd_conjunto = ${cdConjuntoUsina}
      ORDER BY 1`
    )
  }
}
