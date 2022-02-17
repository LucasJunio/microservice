import { inject, injectable } from 'inversify'
import { TYPE } from '../../../constants/types'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'
import { ParadaProgramadaService } from '../parada_programada/paradaProgramadaService'
import formatDate from '../../../util/formatDate'
import { parseISO } from 'date-fns'
export interface IReprogramacaoParadaService {
  saveReprogramacaoParada(repro: any, authorization: string)
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

  @inject(TYPE.ParadaProgramadaService)
  private readonly paradaProgramadaService: ParadaProgramadaService

  public async saveReprogramacaoParada(repro: any, authorization: string) {
    const parada = await this.sauProgramacaoParadaRepository.getById(repro.cdPp)
    const statusReprog = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('AAPRV_USINA', 13)

    parada.idTipoParada = await this.sauItemLookUpRepository.getTipoParadaByDate(
      parseISO(parada.DT_CRIACAO_PARADA.toString()),
      parseISO(parada.DT_HORA_INICIO_REPROGRAMACAO.toString())
    )
    
    const newParada = {
      ...parada,
      ID_STATUS_PROGRAMACAO: 'R',
      DT_HORA_INICIO_REPROGRAMACAO: repro.dataInicio,
      DT_HORA_TERMINO_REPROGRAMACAO: repro.dataTermino,
      idStatusReprogramacao: statusReprog,
      idOrigemReprogramacao: null,
      idMotivoReprogramacao: null,
      DS_NOVA_DESCRICAO_PROGR_PARADA: repro.descricao,
      DS_MOTIVO_REPROGRAMACAO: repro.motivo,
      cdClassifReprogrParada: repro.classificacao,
      cdSubclasReprogrParada: repro.subClassificacao,
      DS_OBSERVACAO_REPROGR_PARADA: null,
      NM_AREA_ORIGEM_REPROGRAMACAO: null,
      USER_UPDATE: repro.user,
      DATE_UPDATE: formatDate(),
    }
 
    const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(
      newParada,
      'EM ANÁLISE USINA',
      newParada.ID_STATUS_PROGRAMACAO,
      newParada.USER_UPDATE,
      `A reprogramação foi criada no status EM ANÁLISE USINA`
    )

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico, authorization)
    await this.sauProgramacaoParadaRepository.saveProgramacaoParada(newParada)

    await this.paradaProgramadaService.fluxoNotificacao(parada, newParada, authorization)

    return this.sauProgramacaoParadaRepository.getById(newParada.CD_PROGRAMACAO_PARADA)
  }
}
