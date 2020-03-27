import { AsyncContainerModule } from 'inversify'
import { getDbConnection } from './config/ormconfig'
import { TYPE } from './constants/types'
import { logger } from './util/logger'
import { IUsinaService, UsinaService } from './modules/v1/usina/usinaService'
import { ISauUsinaRepository, SauUsinaRepository } from './repositories/sauUsinaRepository'
import {
  ISauProgramacaoParadaRepository,
  SauProgramacaoParadaRepository
} from './repositories/sauProgramacaoParadaRepository'
import {
  ISauClassificacaoParadaRepository,
  SauClassificacaoParadaRepository
} from './repositories/sauClassificacaoParadaRepository'
import { ISauItemLookUpRepository, SauItemLookUpRepository } from './repositories/sauItemLookupRepository'
import {
  ISauParamProgramacaoParadaRepository,
  SauParamProgramacaoParadaRepository
} from './repositories/sauParamProgramacaoParadaRepository'
import {
  ISauSubClassificacaoParadaRepository,
  SauSubClassificacaoParadaRepository
} from './repositories/sauSubclassificacaoParadaRepository'
import { ISauPgiRepository, SauPgiRepository } from './repositories/sauPgiRepository'
import {
  ParadaProgramadaService,
  IParadaProgramadaService
} from './modules/v1/parada_programada/paradaProgramadaService'
import { FluxoService, IFluxoService } from './modules/v1/fluxo/fluxoService'
import {
  IReprogramacaoParadaService,
  ReprogramacaoParadaService
} from './modules/v1/reprogramacao/reprogramacaoParadaService'
import {
  ISauUnidadeGeradoraRepository,
  SauUnidadeGeradoraRepository
} from './repositories/sauUnidadeGeradoraRepository'
import { IUnidadeGeradoraService, UnidadeGeradoraService } from './modules/v1/unidade_geradora/unidadeGeradoraService'
import { ISauConsultaPpRepository, SauConsultaPpRepository } from './repositories/sauConsultaPpRepository'
import {
  ISauHistProgramacaoParadaRepository,
  SauHistProgramacaoParadaRepository
} from './repositories/sauHistProgramacaoParadaRepository'
import {
  ISauProgramacaoParadaUgRepository,
  SauProgramacaoParadaUgRepository
} from './repositories/sauProgramacaoParadaUgRepository'

export const bindings = new AsyncContainerModule(async bind => {
  try {
    // Binding Connection
    await getDbConnection()

    // Bindin Controllers
    await require('./modules/v1/parada_programada/paradaProgramadaController')
    await require('./modules/v1/usina/usinaController')
    await require('./modules/v1/unidade_geradora/unidadeGeradoraController')
    await require('./modules/v1/fluxo/fluxoController')
    await require('./modules/v1/reprogramacao/reprogramacaoParadaController')

    // Binding the services
    bind<IParadaProgramadaService>(TYPE.ParadaProgramadaService).to(ParadaProgramadaService)
    bind<IUsinaService>(TYPE.UsinaService).to(UsinaService)
    bind<IUnidadeGeradoraService>(TYPE.UnidadeGeradoraService).to(UnidadeGeradoraService)
    bind<IFluxoService>(TYPE.FluxoService).to(FluxoService)
    bind<IReprogramacaoParadaService>(TYPE.ReprogramacaoParadaService).to(ReprogramacaoParadaService)

    // Binding the repositories
    bind<ISauProgramacaoParadaUgRepository>(TYPE.SauProgramacaoParadaUgRepository).to(SauProgramacaoParadaUgRepository)
    bind<ISauUsinaRepository>(TYPE.SauUsinaRepository).to(SauUsinaRepository)
    bind<ISauHistProgramacaoParadaRepository>(TYPE.SauHistProgramacaoParadaRepository).to(
      SauHistProgramacaoParadaRepository
    )
    bind<ISauUnidadeGeradoraRepository>(TYPE.SauUnidadeGeradoraRepository).to(SauUnidadeGeradoraRepository)
    bind<ISauClassificacaoParadaRepository>(TYPE.SauClassificacaoParadaRepository).to(SauClassificacaoParadaRepository)
    bind<ISauItemLookUpRepository>(TYPE.SauItemLookUpRepository).to(SauItemLookUpRepository)
    bind<ISauParamProgramacaoParadaRepository>(TYPE.SauParamProgramacaoParadaRepository).to(
      SauParamProgramacaoParadaRepository
    )
    bind<ISauSubClassificacaoParadaRepository>(TYPE.SauSubClassificacaoParadaRepository).to(
      SauSubClassificacaoParadaRepository
    )
    bind<ISauPgiRepository>(TYPE.SauPgiRepository).to(SauPgiRepository)
    bind<ISauProgramacaoParadaRepository>(TYPE.SauProgramacaoParadaRepository).to(SauProgramacaoParadaRepository)
    bind<ISauConsultaPpRepository>(TYPE.SauConsultaPpRepository).to(SauConsultaPpRepository)

    logger.info('Binding: Todos Módulos carregados corretamente')
  } catch (error) {
    logger.error(`Binding Erro: ${error}`)
  }
})
