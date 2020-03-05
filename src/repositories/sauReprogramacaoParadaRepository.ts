import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_REPROGRAMACAO_PARADA } from '../entities/SAU_REPROGRAMACAO_PARADA'
import { SAU_PROGRAMACAO_PARADA } from '../entities/SAU_PROGRAMACAO_PARADA'
import { SAU_ITEM_LOOKUP } from '../entities/SAU_ITEM_LOOKUP'

export interface ISauReprogramacaoParadaRepository {
  saveReprogramacaoParada(reprogramacao: SAU_REPROGRAMACAO_PARADA): Promise<SAU_REPROGRAMACAO_PARADA>
  getDefaultReprogramacaoParada(
    repr: any,
    statusReprog: SAU_ITEM_LOOKUP,
    parada: SAU_PROGRAMACAO_PARADA
  ): Promise<SAU_REPROGRAMACAO_PARADA>
  getReprSeq(): Promise<any>
}

@injectable()
export class SauReprogramacaoParadaRepository implements ISauReprogramacaoParadaRepository {
  private readonly sauReprogramacaoParadaRepository: Repository<SAU_REPROGRAMACAO_PARADA>

  constructor() {
    this.sauReprogramacaoParadaRepository = getRepository(SAU_REPROGRAMACAO_PARADA)
  }

  public async saveReprogramacaoParada(reprogramacao: SAU_REPROGRAMACAO_PARADA): Promise<SAU_REPROGRAMACAO_PARADA> {
    return this.sauReprogramacaoParadaRepository.save(reprogramacao)
  }

  public async getDefaultReprogramacaoParada(
    repr: any,
    statusReprog: SAU_ITEM_LOOKUP,
    parada: SAU_PROGRAMACAO_PARADA
  ): Promise<SAU_REPROGRAMACAO_PARADA> {
    const idRepr = await this.getReprSeq()
    const reprogramacao = new SAU_REPROGRAMACAO_PARADA()

    reprogramacao.CD_REPROGRAMACAO_PARADA = idRepr[0].ID
    reprogramacao.DT_HORA_INICIO_REPROGRAMACAO = repr.dataInicio
    reprogramacao.DT_HORA_TERMINO_REPROGRAMACAO = repr.dataTermino
    reprogramacao.idStatusReprogramacao = statusReprog
    reprogramacao.idOrigemReprogramacao = null
    reprogramacao.idMotivoReprogramacao = null
    reprogramacao.DS_MOTIVO_REPROGRAMACAO = null
    reprogramacao.cdClassifReprogrParada = repr.classificacao
    reprogramacao.cdSubclasReprogrParada = repr.subClassificacao
    reprogramacao.DS_NOVA_DESCRICAO_PROGR_PARADA = repr.motivo
    reprogramacao.NM_AREA_ORIGEM_REPROGRAMACAO = null
    reprogramacao.USER_CREATE = repr.user
    reprogramacao.DATE_CREATE = new Date()
    reprogramacao.USER_UPDATE = repr.user
    reprogramacao.DATE_UPDATE = new Date()

    reprogramacao.cdProgramacaoParada = parada

    return reprogramacao
  }

  public async getReprSeq(): Promise<any> {
    return this.sauReprogramacaoParadaRepository.query('select SAU_REPROGRAMACAO_PARADA_S.nextval as id FROM DUAL')
  }
}
