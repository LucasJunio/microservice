import { inject, injectable } from 'inversify'
import { TYPE } from '../../../constants/types'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'
import { SauReprogramacaoParadaRepository } from '../../../repositories/sauReprogramacaoParadaRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'

import { SAU_PROGRAMACAO_PARADA } from '../../../entities/SAU_PROGRAMACAO_PARADA'
import { SAU_HIST_PROGRAMACAO_PARADA } from '../../../entities/SAU_HIST_PROGRAMACAO_PARADA'

import { ParadaProgramadaService } from '../parada_programada/paradaProgramadaService'
import { SAU_ITEM_LOOKUP } from 'entities/SAU_ITEM_LOOKUP'

export interface IReprogramacaoParadaService {
}

@injectable()
export class ReprogramacaoParadaService implements IReprogramacaoParadaService {

    // REPOSITORIES
    @inject(TYPE.SauReprogramacaoParadaRepository)
    private readonly sauReprogramacaoParadaRepository: SauReprogramacaoParadaRepository

    @inject(TYPE.SauItemLookUpRepository)
    private readonly sauItemLookUpRepository: SauItemLookUpRepository
  
    
    @inject(TYPE.SauHistProgramacaoParadaRepository)
    private readonly sauHistProgramacaoParadaRepository: SauHistProgramacaoParadaRepository

    @inject(TYPE.SauProgramacaoParadaRepository)
    private readonly sauProgramacaoParadaRepository: SauProgramacaoParadaRepository
    
    public async saveReprogramacaoParada(repro : any) {
        const parada = await this.sauProgramacaoParadaRepository.getById(repro.cdPp)
        const statusReprog = await this.sauItemLookUpRepository.getItemLookUpByCdAndId('AAPRV_USINA', 13)

        const reproToSave = await this.sauReprogramacaoParadaRepository.getDefaultReprogramacaoParada(repro, statusReprog, parada)
        await this.sauReprogramacaoParadaRepository.saveReprogramacaoParada(reproToSave)
        
        parada.ID_STATUS_PROGRAMACAO = 'R'
        parada.NR_REPROGRAMACOES_APROVADAS += 1;
        delete parada.sauReprogramacaoParadas

        const historico = this.sauHistProgramacaoParadaRepository.createDefaultHistorico(parada, 'AAPRV_USINA', parada.ID_STATUS_PROGRAMACAO)
        await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico);

        
        await this.sauProgramacaoParadaRepository.saveProgramacaoParada(parada)

        return this.sauProgramacaoParadaRepository.getById(parada.CD_PROGRAMACAO_PARADA)
    }
 
}
