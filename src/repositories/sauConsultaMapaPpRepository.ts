import { injectable } from 'inversify'
import { getRepository, Repository, Brackets } from 'typeorm'
import { isEmpty, isNull, reduce } from 'lodash'

import { ConsultaMapaPPV } from '../entities/consultaMapaPPV'
import { Pgi } from '../entities/pgi'
import { ProrrogacaoPgi } from '../entities/prorrogacaoPgi'
import ConsultaMapaVDto from '../entities/consultaMapaVDto'
import formatDate from '../util/formatDate'
export interface ISauConsultaMapaPpRepository {
  getAll(filter: ConsultaMapaVDto): Promise<ConsultaMapaVDto>
  getAllDtTerminoPgi(numParada: number): Promise<Array<{DT_FIM_PREVISTO: string}>>
}

@injectable()
export class SauConsultaMapaPpRepository implements ISauConsultaMapaPpRepository {
  private readonly sauConsultaMapaPpRepository: Repository<ConsultaMapaPPV>
  private readonly sauPgiRepository: Repository<Pgi>
  private readonly sauProrrogacaoPgiRepository: Repository<ProrrogacaoPgi>
  
  constructor() {
    this.sauConsultaMapaPpRepository = getRepository(ConsultaMapaPPV)
    this.sauPgiRepository = getRepository(Pgi)
    this.sauProrrogacaoPgiRepository = getRepository(ProrrogacaoPgi)
  }

  public async getAll(filter: ConsultaMapaVDto): Promise<ConsultaMapaVDto> {
    
    const { dtFim, dtInicio, dtHistorica, usinas, status, tipoParadas, tipoUsinas, usinasToShow } = filter

    const columns = [
      'CD_CONJUNTO_USINA',
      'SG_CONJUNTO_USINA',
      'TIPO_USINA',
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
      'DS_STATUS_PARADA_CANC',
      'DS_CLASSIFICACAO_PARADA',
      'DS_SUBCLASSIFICACAO_PARADA',
      'DT_PRORROGACAO_PGI',
      'ID_ATUAL_HISTORICO',
      'DS_MOTIVO_CANCELAMENTO',
      'CD_PGI',
      'NUM_PGI',
      'ORDEM_USINA',
      'REGIONAL_USINA',
      'DT_INICIO_REPROG',
      'DT_FIM_REPROG'
    ]
    const query = this.sauConsultaMapaPpRepository.createQueryBuilder('SAU_MAPA_PARADA_PP_V').select(columns)

    query.where('1 = 1')

    query.andWhere(
      new Brackets(qbAtu => {
        if (!isEmpty(dtInicio) && !isEmpty(dtFim)) {
          qbAtu
            // programa????o
            .where("TO_CHAR(DT_HORA_INICIO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') >= :dtInicio", {
              dtInicio
            })
            .andWhere("TO_CHAR(DT_HORA_INICIO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
              dtFim
            })

            .orWhere("TO_CHAR(DT_HORA_TERMINO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') >= :dtInicio", {
              dtInicio
            })
            .andWhere("TO_CHAR(DT_HORA_TERMINO_PROGRAMACAO, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
              dtFim
            })

            // execu????o
            .orWhere("TO_CHAR(DT_HORA_INICIO_SERVICO, 'YYYY-MM-DD HH24:MI:SS') >= :dtInicio", {
              dtInicio
            })
            .andWhere("TO_CHAR(DT_HORA_INICIO_SERVICO, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
              dtFim
            })

            .orWhere("TO_CHAR(DT_HORA_TERMINO_SERVICO, 'YYYY-MM-DD HH24:MI:SS') >= :dtInicio", {
              dtInicio
            })
            .andWhere("TO_CHAR(DT_HORA_TERMINO_SERVICO, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
              dtFim
            })

            // execu????o sem fim
            .orWhere('DT_HORA_TERMINO_SERVICO is null')
            .andWhere("TO_CHAR(DT_HORA_INICIO_SERVICO, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
              dtFim
            })
            .andWhere("TO_CHAR(:now, 'YYYY-MM-DD HH24:MI:SS') >= :dtInicio", {
              dtInicio,
              now: formatDate()
            })
            .andWhere("TO_CHAR(:now, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
              dtFim,
              now: formatDate()
            })

            // prorroga????o
            .orWhere("TO_CHAR(DT_PRORROGACAO_PGI, 'YYYY-MM-DD HH24:MI:SS') >= :dtInicio", {
              dtInicio
            })
            .andWhere("TO_CHAR(DT_PRORROGACAO_PGI, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
              dtFim
            })

          // Reprogramacao
          // .orWhere("TO_CHAR(DT_INICIO_REPROG, 'YYYY-MM-DD HH24:MI:SS') >= :dtInicio", {
          //   dtInicio
          // })
          // .andWhere("TO_CHAR(DT_INICIO_REPROG, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
          //   dtFim
          // })

          // .orWhere("TO_CHAR(DT_FIM_REPROG, 'YYYY-MM-DD HH24:MI:SS') >= :dtInicio", {
          //   dtInicio
          // })
          // .andWhere("TO_CHAR(DT_FIM_REPROG, 'YYYY-MM-DD HH24:MI:SS') <= :dtFim", {
          //   dtFim
          // })
        }
      })
    )

    if (!isEmpty(usinas)) {
      const filterUsinas = reduce(usinas, (acc, usina) => [...acc, usina.SG_CONJUNTO_USINA], [])
      query.andWhere('SG_CONJUNTO_USINA IN (:...filterUsinas)', { filterUsinas })
    } else {
      const filterUsinas = reduce(usinasToShow, (acc, usina) => [...acc, usina.SG_CONJUNTO_USINA], [])
      query.andWhere('SG_CONJUNTO_USINA IN (:...filterUsinas)', { filterUsinas })
    }

    if (!isEmpty(tipoUsinas)) {
      const filterTipoUsina = reduce(tipoUsinas, (acc, tUsina) => [...acc, tUsina.ID_ITEM_LOOKUP], [])
      query.andWhere('TIPO_USINA IN (:...filterTipoUsina)', { filterTipoUsina })
    }

    if (!isEmpty(status)) {
      const filterStatus = reduce(status, (acc, sts) => [...acc, sts.ID_ITEM_LOOKUP], [])
      query.andWhere(
        new Brackets(qb => {
          qb.where(
            'STATUS_PARADA IN (:...filterStatus) AND' +
              '(ID_STATUS_PROGRAMACAO = :stsPr OR ID_STATUS_PROGRAMACAO = :stsEx)',
            {
              filterStatus,
              stsPr: 'P',
              stsEx: 'E'
            }
          )
            .orWhere('STATUS_PARADA_REPROG IN (:...filterStatus) AND ID_STATUS_PROGRAMACAO = :stsRe', {
              filterStatus,
              stsRe: 'R'
            })
            .orWhere('STATUS_PARADA_CANC IN (:...filterStatus) AND ID_STATUS_PROGRAMACAO = :stsCa', {
              filterStatus,
              stsCa: 'C'
            })
        })
      )
    }

    if (!isEmpty(tipoParadas)) {
      const filterTipoParadas = reduce(tipoParadas, (acc, tipoParada) => [...acc, tipoParada.ID_ITEM_LOOKUP], [])
      query.andWhere('TIPO_PARADA IN (:...filterTipoParadas)', { filterTipoParadas })
    }
    // qbAtu.andWhere('ID_ATUAL_HISTORICO = :idAtual', { idAtual: 'A' })
    // qbHist.orWhere('ID_ATUAL_HISTORICO = :idAtualH', { idAtualH: 'H' })

    query.andWhere(
      new Brackets(qb => {
        qb.where('ID_ATUAL_HISTORICO = :idAtual', { idAtual: 'A' })

        if (!isEmpty(dtHistorica)) {
          qb.orWhere(
            new Brackets(qb1 => {
              qb1.where('ID_ATUAL_HISTORICO = :idAtualH', { idAtualH: 'H' })
              qb1.andWhere(
                'DT_CRIACAO_PARADA = ' +
                  query
                    .subQuery()
                    .select('MAX(DT_CRIACAO_PARADA)')
                    .from(ConsultaMapaPPV, 'MAPA_PP_SUBQ')
                    .where('SAU_MAPA_PARADA_PP_V.CD_PROGRAMACAO_PARADA = MAPA_PP_SUBQ.CD_PROGRAMACAO_PARADA')
                    .andWhere('ID_ATUAL_HISTORICO = :idAtualH', { idAtualH: 'H' })
                    .andWhere("TO_CHAR(DT_CRIACAO_PARADA, 'YYYY-MM-DD HH24:MI:SS') <= :dtHistorica", { dtHistorica })
                    .getQuery()
              )
            })
          )
        }
      })
    )

    query
      .orderBy('SG_CONJUNTO_USINA')
      .addOrderBy('SG_UNIDADE_GERADORA')
      .addOrderBy('DT_HORA_INICIO_PROGRAMACAO')

    const paradas = await query.getRawMany()
    const paradasPosDtHist = this.handleDtHistorica(paradas)

    filter.paradas  = await this.handleProrrogacaoPgi(paradasPosDtHist)

    return filter
  }

  public handleDtHistorica(paradas: ConsultaMapaPPV[]): ConsultaMapaPPV[] {
    const dtHistoricaConsultaPp = paradas.filter(parada => parada.ID_ATUAL_HISTORICO === 'H')
    const consultaPp = paradas.filter(parada => parada.ID_ATUAL_HISTORICO === 'A')

    consultaPp.forEach(parada => {
      dtHistoricaConsultaPp.forEach(paradaHist => {
        if (paradaHist.CD_PROGRAMACAO_PARADA === parada.CD_PROGRAMACAO_PARADA) {
          parada.dtHistoricaObj = paradaHist
        }
      })
    })

    return consultaPp
  }

  public async handleProrrogacaoPgi(paradas: ConsultaMapaPPV[]): Promise<ConsultaMapaPPV[]> {

    const promises = paradas.map(async parada => {
      if(parada.STATUS_PARADA === 'EXECUCAO'){     

        const vetDtTerminoPgi: Array<{DT_FIM_PREVISTO: string}> = await this.getAllDtTerminoPgi(parada.CD_PROGRAMACAO_PARADA)
        const vetDtProrrogadacaoPgi: Array<{DT_FIM_PREVISTO: string}> = await this.getAllDtProrrogacaoPgi(parada.CD_PGI)

        if(!(isEmpty(vetDtProrrogadacaoPgi) || isNull(vetDtProrrogadacaoPgi))){
          vetDtProrrogadacaoPgi.forEach(dtProrogacaoPgi => {
            vetDtTerminoPgi.push(dtProrogacaoPgi)
          })
        }
        
        if(!(isEmpty(vetDtTerminoPgi) || isNull(vetDtTerminoPgi))){
          const vetDtTerInt = vetDtTerminoPgi.map(dtTermino => Date.parse(`${dtTermino.DT_FIM_PREVISTO}`));
          const maiorDtTer = Math.max(...vetDtTerInt);
          parada.DT_PRORROGACAO_PGI = new Date(maiorDtTer)
        } else {
          parada.DT_HORA_TERMINO_SERVICO = new Date()
        }
      }
    });

    await Promise.all(promises);
      
    return paradas
  }

  public async getAllDtTerminoPgi(numParada: number): Promise<Array<{DT_FIM_PREVISTO: string}>> {
    
    const query = this.sauPgiRepository.createQueryBuilder('SAU_PGI').select('DT_FIM_PREVISTO')
    
    return await query
      .where('CD_PROGRAMACAO_PARADA = :numParada', { numParada })      
      .getRawMany()
  }

  public async getAllDtProrrogacaoPgi(AllCdPgi: string): Promise<Array<{DT_FIM_PREVISTO: string}>> {

    if(!!AllCdPgi){

      let vetCdPgi = AllCdPgi.split(',')
      
      let AllDtProrrogacaoAllPgi = []

      const promises = vetCdPgi.map(async cdPgi => {

      const query = this.sauProrrogacaoPgiRepository.createQueryBuilder('p').select('DT_PRORROGADA AS DT_FIM_PREVISTO')
        query
          .innerJoin('p.cdPgi', 'cdPgi')
          .innerJoin('cdPgi.idStatus', 'idStatus')
          .innerJoin('idStatus.cdLookup', 'cdLookup')
          .where('cdLookup.ID_LOOKUP = :statusPgi', { statusPgi:'STATUS_PGI'})
          .andWhere('p.cdPgi = :cdPgi', {cdPgi})        
          .andWhere('idStatus.ID_ITEM_LOOKUP != :idItemIndeferido', { idItemIndeferido: 'INDEFERIDO' })
          .andWhere('idStatus.ID_ITEM_LOOKUP != :idItemCancelado', { idItemCancelado: 'CANCELADO' })
          .getRawMany()    

        let AllDtProrrogacaoPgi = await query.getRawMany()

        AllDtProrrogacaoPgi.forEach(dtProrogacaoPgi => {
            AllDtProrrogacaoAllPgi.push(dtProrogacaoPgi)
        })
      });
      
      await Promise.all(promises);
      
      return AllDtProrrogacaoAllPgi
    }
    return null
  }
}
