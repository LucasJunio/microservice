import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_PROGRAMACAO_PARADA } from '../entities/SAU_PROGRAMACAO_PARADA'
import { SAU_USINA } from '../entities/SAU_USINA'

const tableRelations = [
  'sauProgramacaoParadaUgs',
  'sauProgramacaoParadaUgs.cdUnidadeGeradora',
  'cdClassificacaoProgrParada',
  'cdSubclassifProgrParada',
  'idTipoParada',
  'idStatus',
  'idTipoProgramacao',
  'idStatusCancelamento',
  'sauReprogramacaoParadas',
  'sauReprogramacaoParadas.idStatusReprogramacao'
]

export interface ISauProgramacaoParadaRepository {
  saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA>
  getById(id: number): Promise<SAU_PROGRAMACAO_PARADA>
  getAll(): Promise<SAU_PROGRAMACAO_PARADA[]>
  // getLastIdSeqParada(cdParada: number): Promise<SAU_PROGRAMACAO_PARADA[]>
  getLastIdParada(): Promise<SAU_PROGRAMACAO_PARADA[]>
}

@injectable()
export class SauProgramacaoParadaRepository implements ISauProgramacaoParadaRepository {
  private readonly sauProgramacaoParadaRepository: Repository<SAU_PROGRAMACAO_PARADA>
  private readonly sauUsinaRepository: Repository<SAU_USINA>

  constructor() {
    this.sauProgramacaoParadaRepository = getRepository(SAU_PROGRAMACAO_PARADA)
    this.sauUsinaRepository = getRepository(SAU_USINA)
  }

  public async saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    if(!programcaoParada.CD_PROGRAMACAO_PARADA) {
      const idParada = await this.getParadaSeq()
      programcaoParada.CD_PROGRAMACAO_PARADA = idParada[0].ID;
    } 
    return this.sauProgramacaoParadaRepository.save(programcaoParada)
  }

  public getAll(): Promise<SAU_PROGRAMACAO_PARADA[]> {
    return this.sauProgramacaoParadaRepository.find({
      relations: tableRelations
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

  public async getById(id: number): Promise<SAU_PROGRAMACAO_PARADA> {
    const pp = await this.sauProgramacaoParadaRepository.findOne(id, { relations: tableRelations })
    const usina = await this.getUsinaByCdAndId(pp.CD_CONJUNTO_USINA, pp.ID_CONJUNTO_USINA);
    pp.usina = usina[0]

    return pp
  }

  public getUsinaByCdAndId(cdConjuntoUsina: number, idConjuntoUsina: string): Promise<SAU_USINA> {

    if(idConjuntoUsina === "U") {
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
