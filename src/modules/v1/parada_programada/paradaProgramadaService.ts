import { inject, injectable } from 'inversify'
import { SauClassificacaoParadaRepository } from '../../../repositories/sauClassificacaoParadaRepository'
import { SAU_CLASSIFICACAO_PARADA } from '../../../entities/SAU_CLASSIFICACAO_PARADA'
import { TYPE } from '../../../constants/types'
import { SAU_PARAM_PROGRAMACAO_PARADAS } from '../../../entities/SAU_PARAM_PROGRAMACAO_PARADAS'
import { SauParamProgramacaoParadaRepository } from '../../../repositories/sauParamProgramacaoParadaRepository'
import { SauItemLookUpRepository } from '../../../repositories/sauItemLookupRepository'
import { SauPgiRepository } from '../../../repositories/sauPgiRepository'
import { SauProgramacaoParadaRepository } from '../../../repositories/sauProgramacaoParadaRepository'
import { SauSubClassificacaoParadaRepository } from '../../../repositories/sauSubclassificacaoParadaRepository'
import { SAU_ITEM_LOOKUP } from '../../../entities/SAU_ITEM_LOOKUP'
import { SAU_PGI } from '../../../entities/SAU_PGI'
import { SAU_SUBCLASSIFICACAO_PARADA } from '../../../entities/SAU_SUBCLASSIFICACAO_PARADA'
import { SAU_PROGRAMACAO_PARADA } from '../../../entities/SAU_PROGRAMACAO_PARADA'

export interface IParadaProgramadaService {
  getClassificacoesParada(sgUsina: string): Promise<SAU_CLASSIFICACAO_PARADA[]>
  getParamProgramacaoParada(year: string): Promise<SAU_PARAM_PROGRAMACAO_PARADAS>
  getNroAnosParadaLongoPrazo(): Promise<SAU_PARAM_PROGRAMACAO_PARADAS[]>
  getItemLookUpByIdLookup(idLookup: string): Promise<SAU_ITEM_LOOKUP[]>
  getPgi(numPgi: string): Promise<SAU_PGI>
  getNumPGI(numParada: number): Promise<SAU_PGI>
  savePgi(pgi: SAU_PGI): Promise<SAU_PGI>
  getSubClassificacaoParada(cdClassificacao: number, idTipoUsina: string): Promise<SAU_SUBCLASSIFICACAO_PARADA[]>
  saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA>
  getById(id: number): Promise<SAU_PROGRAMACAO_PARADA>
  getAll(): Promise<SAU_PROGRAMACAO_PARADA[]>
  getLastIdSeqParada(cdParada: number): Promise<SAU_PROGRAMACAO_PARADA[]>
  getLastIdParada(): Promise<SAU_PROGRAMACAO_PARADA[]>
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

  public getClassificacoesParada(sgUsina: string): Promise<SAU_CLASSIFICACAO_PARADA[]> {
    return this.sauClassificacaoParadaRepository.getClassificacoesParada(sgUsina)
  }

  public getParamProgramacaoParada(year: string): Promise<SAU_PARAM_PROGRAMACAO_PARADAS> {
    return this.sauParamProgramacaoParadaRepository.getParamProgramacaoParada(year)
  }

  public getNroAnosParadaLongoPrazo(): Promise<SAU_PARAM_PROGRAMACAO_PARADAS[]> {
    return this.sauParamProgramacaoParadaRepository.getNroAnosParadaLongoPrazo()
  }
  public getItemLookUpByIdLookup(idLookup: string): Promise<SAU_ITEM_LOOKUP[]> {
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

  public getSubClassificacaoParada(
    cdClassificacao: number,
    idTipoUsina: string
  ): Promise<SAU_SUBCLASSIFICACAO_PARADA[]> {
    return this.sauSubClassificacaoParadaRepository.getSubClassificacaoParada(cdClassificacao, idTipoUsina)
  }

  public saveProgramacaoParada(programcaoParada: SAU_PROGRAMACAO_PARADA): Promise<SAU_PROGRAMACAO_PARADA> {
    return this.sauProgramacaoParadaRepository.saveProgramacaoParada(programcaoParada)
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
}
