import { injectable } from 'inversify'
import { Repository, getRepository, EntityRepository } from 'typeorm'
import { HistProgramacaoParada } from '../entities/histProgramacaoParada'
import { ProgramacaoParada } from '../entities/programacaoParada'

export interface ISauHistProgramacaoParadaRepository {
  findHistoricoById(id: number): Promise<HistProgramacaoParada[]>
  saveHistoricoPp(historico: HistProgramacaoParada): Promise<HistProgramacaoParada>
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

  public async saveHistoricoPp(historico: HistProgramacaoParada): Promise<HistProgramacaoParada> {
    const idHistorico = await this.getHistoricoSeq()
    historico.CD_HISTORICO = idHistorico[0].ID
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
    historico.DATE_CREATE = new Date()
    historico.DT_HISTORICO = new Date()
    historico.CD_USUARIO = user
    historico.USER_CREATE = historico.CD_USUARIO
    historico.DS_ACAO = acao
    historico.DS_OBSERVACAO = msg || `O Status do documento foi alterado para ${historico.DS_ACAO} `
    historico.FLOW = flow // 'FLOW'; // REPR // CANC
    return historico
  }
}
