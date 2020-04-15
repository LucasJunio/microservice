import { inject, injectable } from 'inversify'
import { TYPE } from '../../../constants/types'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'

export interface IReprogramacaoParadaService {
  saveReprogramacaoParada(repro: any)
}

@injectable()
export class ReprogramacaoParadaService implements IReprogramacaoParadaService {
  // REPOSITORIES
  @inject(TYPE.SauItemLookUpRepository)
  private readonly sauItemLookUpRepository: SauItemLookUpRepository

  @inject(TYPE.SauHistProgramacaoParadaRepository)
  private readonly sauHistProgramacaoParadaRepository: SauHistProgramacaoParadaRepository

  @inject(TYPE.SauProgramacaoParadaRepository)
  private readonly sauProgramacaoParadaRepository: SauProgramacaoParadaRepository

  public async saveReprogramacaoParada(repro: any) {
    const parada = await this.sauProgramacaoParadaRepository.getById(repro.cdPp)
    const statusReprog = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('AAPRV_USINA', 13)

    parada.ID_STATUS_PROGRAMACAO = 'R'
    parada.DT_HORA_INICIO_REPROGRAMACAO = repro.dataInicio
    parada.DT_HORA_TERMINO_REPROGRAMACAO = repro.dataTermino
    parada.idStatusReprogramacao = statusReprog
    parada.idOrigemReprogramacao = null
    parada.idMotivoReprogramacao = null
    parada.DS_MOTIVO_REPROGRAMACAO = repro.motivo
    parada.cdClassifReprogrParada = repro.classificacao
    parada.cdSubclasReprogrParada = repro.subClassificacao
    parada.DS_OBSERVACAO_REPROGR_PARADA = null
    parada.NM_AREA_ORIGEM_REPROGRAMACAO = null

    const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      parada,
      'EM ANÁLISE USINA',
      parada.ID_STATUS_PROGRAMACAO,
      parada.USER_UPDATE,
      `A reprogramação foi criada no status EM ANÁLISE USINA`
    )

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico)
    await this.sauProgramacaoParadaRepository.saveProgramacaoParada(parada)

    return this.sauProgramacaoParadaRepository.getById(parada.CD_PROGRAMACAO_PARADA)
  }
}
