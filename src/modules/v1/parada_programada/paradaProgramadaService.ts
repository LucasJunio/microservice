import { inject, injectable } from 'inversify'
import { SauClassificacaoParadaRepository } from '../../../repositories/sauClassificacaoParadaRepository'
import { SAU_CLASSIFICACAO_PARADA } from '../../../entities/SAU_CLASSIFICACAO_PARADA'
import { TYPE } from '../../../constants/types'
import { SAU_PARAM_PROGRAMACAO_PARADAS } from '../../../entities/SAU_PARAM_PROGRAMACAO_PARADAS'
import { SauParamProgramacaoParadaRepository } from '../../../repositories/sauParamProgramacaoParadaRepository'
import { SauConsultaPpRepository } from '../../../repositories/sauConsultaPpRepository'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauPgiRepository } from '../../../repositories/sauPgiRepository'
import { SauHistProgramacaoParadaRepository } from '../../../repositories/sauHistProgramacaoParadaRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'
import { SauSubClassificacaoParadaRepository } from '../../../repositories/sauSubclassificacaoParadaRepository'
import { SAU_ITEM_LOOKUP } from '../../../entities/SAU_ITEM_LOOKUP'
import { SAU_PGI } from '../../../entities/SAU_PGI'
import { SAU_SUBCLASSIFICACAO_PARADA } from '../../../entities/SAU_SUBCLASSIFICACAO_PARADA'
import { SAU_PROGRAMACAO_PARADA } from '../../../entities/SAU_PROGRAMACAO_PARADA'
import { PpConsultaDto } from '../../../entities/PpConsultaDto'
import { SAU_CONSULTA_PP_V } from '../../../entities/SAU_CONSULTA_PP_V'
import Constants from '../../../constants/constants'
import { SAU_HIST_PROGRAMACAO_PARADA } from '../../../entities/SAU_HIST_PROGRAMACAO_PARADA'

export interface IParadaProgramadaService {
  getClassificacoesParada(sgUsina: string): Promise<SAU_CLASSIFICACAO_PARADA[]>
  getParamProgramacaoParada(year: string): Promise<SAU_PARAM_PROGRAMACAO_PARADAS>
  getNroAnosParadaLongoPrazo(): Promise<SAU_PARAM_PROGRAMACAO_PARADAS[]>
  getItemLookUpByIdLookup(idLookup: number): Promise<SAU_ITEM_LOOKUP[]>
  getPgi(numPgi: string): Promise<SAU_PGI>
  getNumPGI(numParada: number): Promise<SAU_PGI>
  savePgi(pgi: SAU_PGI): Promise<SAU_PGI>
  getSubClassificacaoParada(cdClassificacao: number, idTipoUsina: string): Promise<SAU_SUBCLASSIFICACAO_PARADA[]>
  saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA>
  getById(id: number): Promise<SAU_PROGRAMACAO_PARADA>
  getAll(): Promise<SAU_PROGRAMACAO_PARADA[]>
  getLastIdSeqParada(cdParada: number): Promise<SAU_PROGRAMACAO_PARADA[]>
  getLastIdParada(): Promise<SAU_PROGRAMACAO_PARADA[]>
  getDocumentos(filtros: PpConsultaDto): Promise<SAU_CONSULTA_PP_V[]>
  getCountDocumentos(filtros: PpConsultaDto): Promise<number>
}

@injectable()
export class ParadaProgramadaService implements IParadaProgramadaService {
  @inject(TYPE.SauClassificacaoParadaRepository)
  private readonly sauClassificacaoParadaRepository: SauClassificacaoParadaRepository

  @inject(TYPE.SauItemLookUpRepository)
  private readonly sauItemLookUpRepository: SauItemLookUpRepository

  @inject(TYPE.SauPgiRepository)
  private readonly sauPgiRepository: SauPgiRepository

  @inject(TYPE.SauProgramacaoParadaRepository)
  private readonly sauProgramacaoParadaRepository: SauProgramacaoParadaRepository

  @inject(TYPE.SauSubClassificacaoParadaRepository)
  private readonly sauSubClassificacaoParadaRepository: SauSubClassificacaoParadaRepository

  @inject(TYPE.SauParamProgramacaoParadaRepository)
  private readonly sauParamProgramacaoParadaRepository: SauParamProgramacaoParadaRepository

  @inject(TYPE.SauConsultaPpRepository)
  private readonly sauConsultaPpRepository: SauConsultaPpRepository

  @inject(TYPE.SauHistProgramacaoParadaRepository)
  private readonly sauHistProgramacaoParadaRepository: SauHistProgramacaoParadaRepository

  public getClassificacoesParada(sgUsina: string): Promise<SAU_CLASSIFICACAO_PARADA[]> {
    return this.sauClassificacaoParadaRepository.getClassificacoesParada(sgUsina)
  }

  public getParamProgramacaoParada(year: string): Promise<SAU_PARAM_PROGRAMACAO_PARADAS> {
    return this.sauParamProgramacaoParadaRepository.getParamProgramacaoParada(year)
  }

  public getNroAnosParadaLongoPrazo(): Promise<SAU_PARAM_PROGRAMACAO_PARADAS[]> {
    return this.sauParamProgramacaoParadaRepository.getNroAnosParadaLongoPrazo()
  }
  public getItemLookUpByIdLookup(idLookup: number): Promise<SAU_ITEM_LOOKUP[]> {
    return this.sauItemLookUpRepository.getItemLookUpByIdLookup(idLookup)
  }

  public getPgi(numPgi: string): Promise<SAU_PGI> {
    return this.sauPgiRepository.getPgi(numPgi)
  }

  public getNumPGI(numParada: number): Promise<SAU_PGI> {
    return this.sauPgiRepository.getNumPGI(numParada)
  }

  public savePgi(pgi: SAU_PGI): Promise<SAU_PGI> {
    return this.sauPgiRepository.savePgi(pgi)
  }

  public getHistoricoById(id: number): Promise<SAU_HIST_PROGRAMACAO_PARADA[]> {
    return this.sauHistProgramacaoParadaRepository.findHistoricoById(id)
  }

  private createDefaultHistorico(parada: SAU_PROGRAMACAO_PARADA, acao: string ): SAU_HIST_PROGRAMACAO_PARADA {
    const historico = new SAU_HIST_PROGRAMACAO_PARADA;
    historico.cdProgramacaoParada = parada;
    historico.DATE_CREATE = new Date();
    historico.DT_HISTORICO = new Date();
    historico.CD_USUARIO = 'Edison'
    historico.USER_CREATE = historico.CD_USUARIO;
    historico.DS_ACAO = acao
    historico.DS_OBSERVACAO = `${historico.CD_USUARIO} Mudou o status do documento para ${historico.DS_ACAO} `
    historico.FLOW = 'FLOW'; // REPR // CANC
    return historico;
  }

  public async nextLevel(parada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
      // const paradaSaved = await this.saveProgramacaoParada(parada)
      const statusParadaProgramada = await this.sauItemLookUpRepository.getItemLookUpByIdLookup(13);
      let historico = null

      switch(parada.idStatus.ID_ITEM_LOOKUP) {
        case 'RASCUNHO':
          parada.idStatus = statusParadaProgramada.find((status: SAU_ITEM_LOOKUP) => status.ID_ITEM_LOOKUP === 'AAPRV_USINA')
          historico = this.createDefaultHistorico(parada, 'AAPRV_USINA');
        break;
        case 'AAPRV_USINA':
          parada.idStatus = statusParadaProgramada.find((status: SAU_ITEM_LOOKUP) => status.ID_ITEM_LOOKUP === 'AAPRV_PGP')

          historico = this.createDefaultHistorico(parada, 'AAPRV_PGP');
        break;
        case 'AAPRV_PGP':
          parada.idStatus = statusParadaProgramada.find((status: SAU_ITEM_LOOKUP) => status.ID_ITEM_LOOKUP === 'AAPRV_OPE')
          historico = this.createDefaultHistorico(parada, 'AAPRV_OPE');
        break;
        case 'AAPRV_OPE':
          parada.idStatus = statusParadaProgramada.find((status: SAU_ITEM_LOOKUP) => status.ID_ITEM_LOOKUP === 'CONCL')
          historico = this.createDefaultHistorico(parada, 'CONCL');
        break;
      }

      await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico);
      return this.saveProgramacaoParada(parada)


  }

  public async prevLevel(parada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    const statusParadaProgramada = await this.sauItemLookUpRepository.getItemLookUpByIdLookup(13);
    let historico = null

    switch(parada.idStatus.ID_ITEM_LOOKUP) {
      case 'AAPRV_OPE':
      case 'AAPRV_PGP':
        parada.idStatus = statusParadaProgramada.find((status: SAU_ITEM_LOOKUP) => status.ID_ITEM_LOOKUP === 'RASCUNHO')
        historico = this.createDefaultHistorico(parada, 'RASCUNHO');
      break;
    }

    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico);
    return this.saveProgramacaoParada(parada)


}
  public getSubClassificacaoParada(
    cdClassificacao: number,
    idTipoUsina: string
  ): Promise<SAU_SUBCLASSIFICACAO_PARADA[]> {
    return this.sauSubClassificacaoParadaRepository.getSubClassificacaoParada(cdClassificacao, idTipoUsina)
  }

  public async saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    let saveHistorico = false;
    if (!programcaoParada.CD_PROGRAMACAO_PARADA) saveHistorico = true

    const idParada = await this.sauProgramacaoParadaRepository.getLastIdParada();
    programcaoParada.CD_PARADA = idParada[0].CD_PARADA + 1 ; // sempre o proximo
    const parada = await this.sauProgramacaoParadaRepository.saveProgramacaoParada(programcaoParada);
    
    if (!saveHistorico)
      return parada
    
    const historico = this.createDefaultHistorico(parada, 'RASCUNHO');
    await this.sauHistProgramacaoParadaRepository.saveHistoricoPp(historico);

    return parada
  }

  public getById(id: number): Promise<SAU_PROGRAMACAO_PARADA> {
    return this.sauProgramacaoParadaRepository.getById(id)
  }

  public getAll(): Promise<SAU_PROGRAMACAO_PARADA[]> {
    return this.sauProgramacaoParadaRepository.getAll()
  }

  public getLastIdSeqParada(cdParada: number): Promise<SAU_PROGRAMACAO_PARADA[]> {
    return this.sauProgramacaoParadaRepository.getLastIdSeqParada(cdParada)
  }

  public getLastIdParada(): Promise<SAU_PROGRAMACAO_PARADA[]> {
    return this.sauProgramacaoParadaRepository.getLastIdParada()
  }

  public async getDocumentos(filtros: PpConsultaDto): Promise<SAU_CONSULTA_PP_V[]> {
    return this.sauConsultaPpRepository.getDocumentos(filtros)
  }

  public async getCountDocumentos(filtros: PpConsultaDto): Promise<number> {
    return this.sauConsultaPpRepository.getCountDocumentos(filtros)
  }
  
  public async getAllNumPgi(): Promise<SAU_PGI[]> {
    return this.sauPgiRepository.getAllNumPgi()
  }
}
