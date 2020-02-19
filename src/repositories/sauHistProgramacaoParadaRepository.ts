import { injectable } from 'inversify'
import { Repository, getRepository } from 'typeorm'
import { SAU_HIST_PROGRAMACAO_PARADA } from '../entities/SAU_HIST_PROGRAMACAO_PARADA'
import { SAU_USINA } from '../entities/SAU_USINA'

export interface ISauHistProgramacaoParadaRepository {
    findHistoricoById(id: number): Promise<SAU_HIST_PROGRAMACAO_PARADA[]>
    saveHistoricoPp(historico: SAU_HIST_PROGRAMACAO_PARADA): Promise<SAU_HIST_PROGRAMACAO_PARADA>
}

@injectable()
export class SauHistProgramacaoParadaRepository implements ISauHistProgramacaoParadaRepository {
    private readonly  sauHistProgramacaoParadaRepository: Repository<SAU_HIST_PROGRAMACAO_PARADA>

    constructor() {
        this.sauHistProgramacaoParadaRepository = getRepository(SAU_HIST_PROGRAMACAO_PARADA)
    }

    public async findHistoricoById (id: number) : Promise<SAU_HIST_PROGRAMACAO_PARADA[]> {
        return this.sauHistProgramacaoParadaRepository.createQueryBuilder('SAU_HIST_PROGRAMACAO_PARADA')
        .where("CD_PROGRAMACAO_PARADA = :CD_PROGRAMACAO_PARADA", { CD_PROGRAMACAO_PARADA: id })
        .orderBy('DATE_CREATE', 'DESC')
        .getMany()
    }

    public async saveHistoricoPp(historico: SAU_HIST_PROGRAMACAO_PARADA): Promise<SAU_HIST_PROGRAMACAO_PARADA> {
        const idHistorico = await this.getHistoricoSeq();
        historico.CD_HISTORICO = idHistorico[0].ID
        return this.sauHistProgramacaoParadaRepository.save(historico)
    }

    public async getHistoricoSeq(): Promise<any> {
        return this.sauHistProgramacaoParadaRepository.query(
            "select SAU_HIST_PROGRAMACAO_PARADA_S.nextval as id FROM DUAL"
        )
    }
}