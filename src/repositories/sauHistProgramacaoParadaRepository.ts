import { injectable } from 'inversify'
import { Repository, getRepository, EntityRepository } from 'typeorm'
import { HistProgramacaoParada } from '../entities/histProgramacaoParada'
import { ProgramacaoParada } from '../entities/programacaoParada'
import { getUsuario } from '../util/api'
export interface ISauHistProgramacaoParadaRepository {
  findHistoricoById(id: number): Promise<HistProgramacaoParada[]>
  saveHistoricoPp(historico: HistProgramacaoParada, authorization: string): Promise<HistProgramacaoParada>
}

@injectable()
@EntityRepository(HistProgramacaoParada)
export class SauHistProgramacaoParadaRepository implements ISauHistProgramacaoParadaRepository {
  public readonly sauHistProgramacaoParadaRepository: Repository<HistProgramacaoParada>

  constructor() {
    this.sauHistProgramacaoParadaRepository = getRepository(HistProgramacaoParada)
  }

  public async findHistoricoById(id: number): Promise<HistProgramacaoParada[]> {
    return this.sauHistProgramacaoParadaRepository
      .createQueryBuilder('SAU_HIST_PROGRAMACAO_PARADA')
      .where('CD_PROGRAMACAO_PARADA = :CD_PROGRAMACAO_PARADA', { CD_PROGRAMACAO_PARADA: id })
      .orderBy('DATE_CREATE', 'DESC')
      .getMany()
  }

  public async saveHistoricoPp(
    historico: HistProgramacaoParada,
    authorization: string
  ): Promise<HistProgramacaoParada> {
    const userUpdade = await getUsuario(historico.NM_USUARIO, authorization)
    const idHistorico = await this.getHistoricoSeq()
    historico.CD_HISTORICO = idHistorico[0].ID
    historico.NM_USUARIO = userUpdade.NM_USUARIO
    return this.sauHistProgramacaoParadaRepository.save(historico)
  }

  public async getHistoricoSeq(): Promise<any> {
    return this.sauHistProgramacaoParadaRepository.query('select SAU_HIST_PROGRAMACAO_PARADA_S.nextval as id FROM DUAL')
  }

  public createDefaultHistorico(
    parada: ProgramacaoParada,
    acao: string,
    flow: string,
    user: string,
    msg?: string
  ): HistProgramacaoParada {
    const historico = new HistProgramacaoParada()
    historico.cdProgramacaoParada = parada
    historico.DATE_CREATE = parada.DATE_UPDATE
    historico.DT_HISTORICO = parada.DATE_UPDATE
    historico.NM_USUARIO = user
    historico.USER_CREATE = historico.NM_USUARIO
    historico.DS_ACAO = acao
    historico.DS_OBSERVACAO = msg || `O Status do documento foi alterado para ${historico.DS_ACAO} `
    historico.FLOW = flow // 'FLOW'; // REPR // CANC

    historico.DT_HORA_INICIO_PROGRAMACAO = parada.DT_HORA_INICIO_PROGRAMACAO
    historico.DT_HORA_TERMINO_PROGRAMACAO = parada.DT_HORA_TERMINO_PROGRAMACAO
    historico.DS_PROGRAMACAO_PARADA = parada.DS_PROGRAMACAO_PARADA
    historico.ID_STATUS_PROGRAMACAO = parada.ID_STATUS_PROGRAMACAO
    historico.idStatus = parada.idStatus
    historico.DS_NUM_CEL_ANEEL = parada.DS_NUM_CEL_ANEEL
    historico.DT_HORA_INICIO_PROGRAMACAO = parada.DT_HORA_INICIO_PROGRAMACAO
    historico.DT_HORA_TERMINO_SERVICO = parada.DT_HORA_TERMINO_SERVICO
    historico.DS_SERVICO_EXECUTADO = parada.DS_SERVICO_EXECUTADO
    historico.idStatusReprogramacao = parada.idStatusReprogramacao
    historico.idStatusCancelamento = parada.idStatusCancelamento
    historico.cdClassificacaoProgrParada = parada.cdClassificacaoProgrParada
    historico.cdSubclassifProgrParada = parada.cdSubclassifProgrParada

    return historico
  }
}
