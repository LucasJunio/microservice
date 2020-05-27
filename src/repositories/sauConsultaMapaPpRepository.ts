import { injectable } from 'inversify'
import { getRepository, Repository, Brackets } from 'typeorm'
import { isEmpty, reduce } from 'lodash'

import { ConsultaMapaPPV } from '../entities/consultaMapaPPV'
import ConsultaMapaPpVDto from '../entities/consultaMapaPpVDto'

export interface ISauConsultaMapaPpRepository {
  getAll(filter: ConsultaMapaPpVDto): Promise<ConsultaMapaPpVDto>
}

@injectable()
export class SauConsultaMapaPpRepository implements ISauConsultaMapaPpRepository {
  private readonly sauConsultaMapaPpRepository: Repository<ConsultaMapaPPV>

  constructor() {
    this.sauConsultaMapaPpRepository = getRepository(ConsultaMapaPPV)
  }

  public async getAll(filter: ConsultaMapaPpVDto): Promise<ConsultaMapaPpVDto> {
    console.log('aklsdjalksjdkalsjdklajsldkajsl')
    const { dtFim, dtInicio, usinas, status, tipoParadas } = filter
    const columns = [
      'CD_CONJUNTO_USINA',
      'SG_CONJUNTO_USINA',
      'CD_UNIDADE_GERADORA',
      'SG_UNIDADE_GERADORA',
      'VL_POTENCIA_INSTALADA',
      'CD_PROGRAMACAO_PARADA',
      'DT_HORA_INICIO_PROGRAMACAO',
      'DT_HORA_TERMINO_PROGRAMACAO',
      'DURACAO_PREVISTA',
      'DS_PROGRAMACAO_PARADA',
      'ID_TIPO_PARADA',
      'TIPO_PARADA',
      'DS_TIPO_PARADA',
      'ID_STATUS_PROGRAMACAO',
      'ID_STATUS',
      'STATUS_PARADA',
      'DS_STATUS_PARADA',
      'DS_NUM_CEL_ANEEL',
      'DT_HORA_INICIO_SERVICO',
      'DT_HORA_TERMINO_SERVICO',
      'DURACAO_EXECUCAO',
      'DS_SERVICO_EXECUTADO',
      'DT_CRIACAO_PARADA',
      'ID_STATUS_REPROGRAMACAO',
      'STATUS_PARADA_REPROG',
      'DS_STATUS_PARADA_REPROG',
      'ID_STATUS_CANCELAMENTO',
      'STATUS_PARADA_CANC',
      'DS_STATUS_PARADA_CANC'
    ]
    const query = this.sauConsultaMapaPpRepository.createQueryBuilder().select(columns)

    query.where('1 = 1')

    !isEmpty(dtInicio)
      ? query.andWhere("TO_CHAR(DT_HORA_INICIO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') >= :dtInicio", {
          dtInicio
        })
      : true

    !isEmpty(dtFim)
      ? query.andWhere("TO_CHAR(DT_HORA_TERMINO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
          dtFim
        })
      : true

    if (!isEmpty(usinas)) {
      const filterUsinas = reduce(usinas, (acc, usina) => [...acc, usina.SG_CONJUNTO_USINA], [])
      query.andWhere('SG_CONJUNTO_USINA IN (:...filterUsinas)', { filterUsinas })
    }

    if (!isEmpty(status)) {
      const filterStatus = reduce(status, (acc, sts) => [...acc, sts.ID_ITEM_LOOKUP], [])
      query.andWhere(
        new Brackets(qb => {
          qb.where('STATUS_PARADA IN (:...filterStatus) ', {
            filterStatus
          })
            .orWhere('STATUS_PARADA_REPROG IN (:...filterStatus) ', { filterStatus })
            .orWhere('STATUS_PARADA_CANC IN (:...filterStatus) ', { filterStatus })
        })
      )
    }

    if (!isEmpty(tipoParadas)) {
      const filterTipoParadas = reduce(tipoParadas, (acc, tipoParada) => [...acc, tipoParada.ID_ITEM_LOOKUP], [])
      query.andWhere('TIPO_PARADA IN (:...filterTipoParadas)', { filterTipoParadas })
    }

    // query.groupBy('SG_CONJUNTO_USINA')
    const paradas = await query.getRawMany()
    filter.paradas = paradas

    return filter
  }
}
