import { injectable } from 'inversify'
import { getRepository, Repository, Brackets } from 'typeorm'
import { isEmpty, reduce } from 'lodash'

import { ConsultaMapaPgiV } from '../entities/consultaMapaPgiV'
import ConsultaMapaVDto from '../entities/consultaMapaVDto'

export interface ISauConsultaMapaPgiRepository {
  getAll(filter: ConsultaMapaVDto): Promise<ConsultaMapaVDto>
}

@injectable()
export class SauConsultaMapaPgiRepository implements ISauConsultaMapaPgiRepository {
  private readonly sauConsultaMapaPgiRepository: Repository<ConsultaMapaPgiV>

  constructor() {
    this.sauConsultaMapaPgiRepository = getRepository(ConsultaMapaPgiV)
  }

  public async getAll(filter: ConsultaMapaVDto): Promise<ConsultaMapaVDto> {
    const { dtFim, dtInicio, dtHistorica, usinas, status, tipoParadas, tipoUsinas } = filter
    const columns = [
      'CD_PGI',
      'ID_CONJUNTO_USINA',
      'CD_CONJUNTO_USINA',
      'SG_CONJUNTO_USINA',
      'CD_UNIDADE_GERADORA',
      'SG_UNIDADE_GERADORA',
      'NUM_PGI',
      'DT_INICIO_PREVISTO',
      'DT_FIM_PREVISTO',
      'ID_STATUS',
      'SG_STATUS',
      'DS_STATUS'
    ]
    const query = this.sauConsultaMapaPgiRepository.createQueryBuilder('SAU_MAPA_PGI_V').select(columns)

    query.where('1 = 1')
    query.andWhere(
      new Brackets(qbAtu => {
        if (!isEmpty(dtInicio) && !isEmpty(dtFim)) {
          qbAtu.andWhere(
            new Brackets(qb => {
              qb.where("TO_CHAR(DT_INICIO_PREVISTO, 'YYYY-MM-DD HH24:MI:SS') >= :dtInicio", {
                dtInicio
              })
                .andWhere("TO_CHAR(DT_INICIO_PREVISTO, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
                  dtFim
                })

                .orWhere("TO_CHAR(DT_FIM_PREVISTO, 'YYYY-MM-DD HH24:MI:SS') >= :dtInicio", {
                  dtInicio
                })
                .andWhere("TO_CHAR(DT_FIM_PREVISTO, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
                  dtFim
                })
            })
          )
        }
      })
    )

    query.orderBy('SG_CONJUNTO_USINA')

    filter.dis = await query.getRawMany()

    return filter
  }
}
