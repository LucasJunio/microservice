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
    const { dtFim, dtInicio, usinas, tipoUsinas, statusDi, diType, isDiSemParada } = filter
    const columns = [
      'CD_PGI',
      'ID_CONJUNTO_USINA',
      'CD_CONJUNTO_USINA',
      'SG_CONJUNTO_USINA',
      'TIPO_USINA',
      'CD_UNIDADE_GERADORA',
      'SG_UNIDADE_GERADORA',
      'NUM_PGI',
      'DT_INICIO_PREVISTO',
      'DT_FIM_PREVISTO',
      'ID_STATUS',
      'SG_STATUS',
      'DS_STATUS',
      'CD_PROGRAMACAO_PARADA',
      'ID_RESTRICAO',
      'DT_INICIO',
      'DT_FIM',
      'NM_DESP_ONS_AGENTE_INICIO',
      'NM_OPERADOR_COS_INICIO',
      'NM_OPERADOR_USINA_INICIO',
      'NM_DESP_ONS_AGENTE_FIM',
      'NM_OPERADOR_COS_FIM',
      'NM_OPERADOR_USINA_FIM',
      'NUM_DOC_EXTERNO'
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

        if (!isEmpty(diType)) {
          qbAtu.andWhere('ID_RESTRICAO = :restricaoType', { restricaoType: diType.ID === 1 ? 'S' : 'N' })
        }

        if (!isEmpty(usinas)) {
          const filterUsinas = reduce(usinas, (acc, usina) => [...acc, usina.SG_CONJUNTO_USINA], [])
          qbAtu.andWhere('SG_CONJUNTO_USINA IN (:...filterUsinas)', { filterUsinas })
        }

        if (!isEmpty(tipoUsinas)) {
          const filterTipoUsina = reduce(tipoUsinas, (acc, tUsina) => [...acc, tUsina.ID_ITEM_LOOKUP], [])
          qbAtu.andWhere('TIPO_USINA IN (:...filterTipoUsina)', { filterTipoUsina })
        }

        if (isDiSemParada) {
          qbAtu.andWhere('CD_PROGRAMACAO_PARADA IS NULL ')
        }

        if (!isEmpty(statusDi)) {
          qbAtu.andWhere(
            new Brackets(qb => {
              qb.where('SG_STATUS = :status ', {
                status: statusDi.ID_ITEM_LOOKUP
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
