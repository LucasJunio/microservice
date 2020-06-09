import { injectable } from 'inversify'
import { getRepository, Repository, SelectQueryBuilder } from 'typeorm'
import { ConsultaPPV } from '../entities/consultaPPV'
import { PpConsultaDto } from '../entities/ppConsultaDto'

export interface ISauConsultaPpRepository {
  getDocumentos(filtros: object): Promise<ConsultaPPV[]>
  getCountDocumentos(filtros: PpConsultaDto): Promise<number>
}

@injectable()
export class SauConsultaPpRepository implements ISauConsultaPpRepository {
  private readonly sauConsultaPpRepository: Repository<ConsultaPPV>

  constructor() {
    this.sauConsultaPpRepository = getRepository(ConsultaPPV)
  }

  public async getDocumentos(filtros: PpConsultaDto): Promise<ConsultaPPV[]> {
    const query = this.createQueryGetDocumentos(filtros)
    const { PAGE, ROWS_PER_PAGE } = filtros
    return query
      .skip(ROWS_PER_PAGE * PAGE)
      .take(ROWS_PER_PAGE)
      .getRawMany()
  }

  public async getCountDocumentos(filtros: PpConsultaDto): Promise<number> {
    const query = this.createQueryGetDocumentos(filtros)
    return query.getCount()
  }

  private createQueryGetDocumentos(filtros: PpConsultaDto): SelectQueryBuilder<ConsultaPPV> {
    const {
      SG_USINA,
      ID_UNIDADE_GERADORA,
      NUM_PARADA,
      DT_HORA_INICIO_PROGRAMACAO,
      DT_HORA_TERMINO_PROGRAMACAO,
      DT_HORA_INICIO_PROGRAMACAO_REF,
      DT_HORA_TERMINO_PROGRAMACAO_REF,
      ID_STATUS,
      ID_TIPO,
      ANO_BASE,
      COLUMN,
      ORDER,
      DATAS_EXATAS
    } = filtros

    const columns = [
      'CD_PROGRAMACAO_PARADA',
      'CD_CONJUNTO_USINA',
      'SG_CONJUNTO_USINA',
      'CD_UNIDADE_GERADORA',
      'SG_UNIDADE_GERADORA',
      'ID_TIPO_PARADA',
      'TIPO_PARADA',
      'DS_TIPO_PARADA',
      'ID_STATUS',
      'STATUS_PARADA',
      'DS_STATUS_PARADA',
      'DT_HORA_INICIO_PROGRAMACAO',
      'DT_HORA_TERMINO_PROGRAMACAO',
      'DT_CRIACAO_PARADA'
    ]

    const query = this.sauConsultaPpRepository.createQueryBuilder().select(columns)

    if (COLUMN && COLUMN.length) {
      COLUMN.forEach((col, index) => {
        if (index === 0) {
          query.orderBy(col, ORDER === 'asc' ? 'ASC' : 'DESC', ORDER === 'asc' ? 'NULLS FIRST' : 'NULLS LAST')
        } else {
          query.addOrderBy(col, ORDER === 'asc' ? 'ASC' : 'DESC', ORDER === 'asc' ? 'NULLS FIRST' : 'NULLS LAST')
        }
      })
    } else {
      query.orderBy(
        'DT_HORA_INICIO_PROGRAMACAO',
        ORDER === 'asc' ? 'ASC' : 'DESC',
        ORDER === 'asc' ? 'NULLS FIRST' : 'NULLS LAST'
      )
    }

    query.addOrderBy(
      'CD_PROGRAMACAO_PARADA',
      ORDER === 'asc' ? 'ASC' : 'DESC',
      ORDER === 'asc' ? 'NULLS FIRST' : 'NULLS LAST'
    )

    query.where('1 = 1')

    SG_USINA ? query.andWhere('SG_CONJUNTO_USINA = :SG_USINA', { SG_USINA }) : true
    ID_UNIDADE_GERADORA ? query.andWhere('CD_UNIDADE_GERADORA = :ID_UNIDADE_GERADORA', { ID_UNIDADE_GERADORA }) : true
    NUM_PARADA ? query.andWhere('CD_PROGRAMACAO_PARADA = :NUM_PARADA', { NUM_PARADA }) : true
    ID_STATUS ? query.andWhere('ID_STATUS = :ID_STATUS', { ID_STATUS }) : true
    ID_TIPO ? query.andWhere('ID_TIPO_PARADA = :ID_TIPO', { ID_TIPO }) : true
    ANO_BASE ? query.andWhere("TO_CHAR(DT_HORA_INICIO_PROGRAMACAO, 'YYYY') = :ANO_BASE", { ANO_BASE }) : true
    DT_HORA_INICIO_PROGRAMACAO_REF
      ? query.andWhere("TO_CHAR(DT_CRIACAO_PARADA, 'YYYY-MM-DD HH24:MI:SS') >= :DT_HORA_INICIO_PROGRAMACAO_REF", {
          DT_HORA_INICIO_PROGRAMACAO_REF
        })
      : true
    DT_HORA_TERMINO_PROGRAMACAO_REF
      ? query.andWhere("TO_CHAR(DT_CRIACAO_PARADA, 'YYYY-MM-DD HH24:MI:SS') <= :DT_HORA_TERMINO_PROGRAMACAO_REF", {
          DT_HORA_TERMINO_PROGRAMACAO_REF
        })
      : true
    if (DT_HORA_TERMINO_PROGRAMACAO) {
      DATAS_EXATAS
        ? query.andWhere(
            "TO_CHAR(DT_HORA_TERMINO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') <= :DT_HORA_TERMINO_PROGRAMACAO",
            { DT_HORA_TERMINO_PROGRAMACAO }
          )
        : query.andWhere(
            "TO_CHAR(DT_HORA_INICIO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') <= :DT_HORA_TERMINO_PROGRAMACAO",
            {
              DT_HORA_TERMINO_PROGRAMACAO
            }
          )
    }
    if (DT_HORA_INICIO_PROGRAMACAO) {
      DATAS_EXATAS
        ? query.andWhere(
            "TO_CHAR(DT_HORA_INICIO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') >= :DT_HORA_INICIO_PROGRAMACAO",
            {
              DT_HORA_INICIO_PROGRAMACAO
            }
          )
        : query.andWhere(
            "TO_CHAR(DT_HORA_TERMINO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') >= :DT_HORA_INICIO_PROGRAMACAO",
            {
              DT_HORA_INICIO_PROGRAMACAO
            }
          )
    }

    return query
  }
}
