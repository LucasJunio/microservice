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
  getConflictingPp(params: any): Promise<ProgramacaoParada[]>
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
    programcaoParada.VERSION += 1
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
        alias: 'p'
      }
    })
    const usina = await this.getUsinaByCdAndId(pp.CD_CONJUNTO_USINA, pp.ID_CONJUNTO_USINA)
    pp.usina = usina[0]

    return pp
  }

  public getUsinaByCdAndId(cdConjuntoUsina: number, idConjuntoUsina: string): Promise<any> {
    if (idConjuntoUsina === 'U') {
      return this.sauUsinaRepository.query(
        `SELECT sg_usina sg_conjunto_usina,
          cd_usina cd_conjunto_usina,
          'U'      id_conjunto_usina
        FROM sau_usina
        WHERE  cd_usina = ${cdConjuntoUsina}
        ORDER BY 1
        `
      )
    }

    return this.sauUsinaRepository.query(
      `SELECT scu.sg_conjunto sg_conjunto_usina,
        scu.cd_conjunto cd_conjunto_usina,
        'C'             id_conjunto_usina
      FROM sau_conjunto_usina scu
      WHERE scu.cd_conjunto = ${cdConjuntoUsina}
      ORDER BY 1`
    )
  }

  public async getConflictingPp(params: any): Promise<ProgramacaoParada[]> {
    if (!params) {
      return Promise.resolve([])
    }
    const { USINA, INICIO, FIM, CD_PARADA } = params

    const [usina] = await this.sauUsinaRepository.query(`
      SELECT usina.ID_GRUPO_COINCID_SIMULADOR_PP ID_GRUPO_COINCID_SIMULADOR_PP
      FROM sau_usina usina
      WHERE usina.SG_USINA = '${USINA}'
    `)

    const query = this.sauProgramacaoParadaRepository
      .createQueryBuilder('pp')
      .leftJoinAndSelect(Usina, 'usina', 'usina.CD_USINA = pp.CD_CONJUNTO_USINA')
      .leftJoinAndSelect('pp.sauProgramacaoParadaUgs', 'sauProgramacaoParadaUgs')
      .leftJoinAndSelect('sauProgramacaoParadaUgs.cdUnidadeGeradora', 'cdUnidadeGeradora')
      .leftJoinAndSelect('pp.idStatus', 'idStatus')
      .where('pp.ID_CONJUNTO_USINA = :ID_CONJUNTO_USINA', { ID_CONJUNTO_USINA: 'U' })
      .andWhere('usina.FL_ATIVO = :FL_ATIVO', { FL_ATIVO: 1 })
      .andWhere('usina.ID_GRUPO_COINCID_SIMULADOR_PP = :ID_GRUPO', { ID_GRUPO: usina.ID_GRUPO_COINCID_SIMULADOR_PP })
      .andWhere("TO_CHAR(pp.DT_HORA_TERMINO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') >= :INICIO", { INICIO })
      .andWhere("TO_CHAR(pp.DT_HORA_INICIO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') <= :FIM", { FIM })
      .andWhere('idStatus.ID_ITEM_LOOKUP NOT IN (:...STATUS)', { STATUS: ['RASCUNHO', 'AAPRV', 'CONCL', 'CANC'] })

    CD_PARADA ? query.andWhere('pp.CD_PARADA != :CD_PARADA', { CD_PARADA }) : true

    const pps = await query.getMany()

    if (pps && pps.length) {
      for (const pp of pps) {
        const usina = await this.getUsinaByCdAndId(pp.CD_CONJUNTO_USINA, pp.ID_CONJUNTO_USINA)
        pp.usina = usina[0]
      }
    }

    return pps
  }

  public async getPpVersion(cdPp: number): Promise<number> {
    const pp = await this.sauProgramacaoParadaRepository.findOne(cdPp, { select: ['VERSION'] })
    return pp.VERSION
  }
}
