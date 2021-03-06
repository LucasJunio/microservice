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
import { ParamsService, IParamsService } from './modules/v1/params/paramsService'

import { FluxoUtilsService, IFluxoUtilsService } from './modules/v1/fluxo/utils/fluxoUtilsService'
import {
  CancelamentoFluxoService,
  ICancelamentoFluxoService
} from './modules/v1/fluxo/fluxoStatus/cancelamentoFluxoService'
import { ExecucaoFluxoService, IExecucaoFluxoService } from './modules/v1/fluxo/fluxoStatus/execucaoFluxoService'
import {
  ReprogramacaoFluxoService,
  IReprogramacaoFluxoService
} from './modules/v1/fluxo/fluxoStatus/reprogramacaoFluxoService'
import {
  ProgramacaoFluxoService,
  IProgramacaoFluxoService
} from './modules/v1/fluxo/fluxoStatus/programacaoFluxoService'
import { IMapaService, MapaService } from './modules/v1/mapa/mapaService'

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
import { ISauConsultaMapaPpRepository, SauConsultaMapaPpRepository } from './repositories/sauConsultaMapaPpRepository'
import {
  ISauConsultaMapaPgiRepository,
  SauConsultaMapaPgiRepository
} from './repositories/sauConsultaMapaPgiRepository'

import { ISauGrupoRestricaoRepository, SauGrupoRestricaoRepository } from './repositories/sauRestricaoRepository'
import { IRestricaoService, RestricaoService } from './modules/v1/restricao/restricaoService'
import { IPgiIntegrationService, PgiIntegrationService } from './modules/v1/pgiIntegration/pgiIntegrationService'

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
    await require('./modules/v1/params/paramsController')
    await require('./modules/v1/mapa/mapaController')
    await require('./modules/v1/restricao/restricaoController')

    // Binding the services
    bind<IParadaProgramadaService>(TYPE.ParadaProgramadaService).to(ParadaProgramadaService)
    bind<IUsinaService>(TYPE.UsinaService).to(UsinaService)
    bind<IUnidadeGeradoraService>(TYPE.UnidadeGeradoraService).to(UnidadeGeradoraService)
    bind<IFluxoService>(TYPE.FluxoService).to(FluxoService)
    bind<IReprogramacaoParadaService>(TYPE.ReprogramacaoParadaService).to(ReprogramacaoParadaService)
    bind<IParamsService>(TYPE.ParamsService).to(ParamsService)
    bind<IProgramacaoFluxoService>(TYPE.ProgramacaoFluxoService).to(ProgramacaoFluxoService)
    bind<IReprogramacaoFluxoService>(TYPE.ReprogramacaoFluxoService).to(ReprogramacaoFluxoService)
    bind<ICancelamentoFluxoService>(TYPE.CancelamentoFluxoService).to(CancelamentoFluxoService)
    bind<IMapaService>(TYPE.MapaService).to(MapaService)
    bind<IRestricaoService>(TYPE.RestricaoService).to(RestricaoService)
    bind<IPgiIntegrationService>(TYPE.PgiIntegrationService).to(PgiIntegrationService)
    bind<IExecucaoFluxoService>(TYPE.ExecucaoFluxoService).to(ExecucaoFluxoService)
    bind<IFluxoUtilsService>(TYPE.FluxoUtilsService).to(FluxoUtilsService)

    // Binding the repositories
    bind<ISauGrupoRestricaoRepository>(TYPE.RestricaoRepository).to(SauGrupoRestricaoRepository)
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
    bind<ISauConsultaMapaPpRepository>(TYPE.SauConsultaMapaPpRepository).to(SauConsultaMapaPpRepository)
    bind<ISauConsultaMapaPgiRepository>(TYPE.SauConsultaMapaPgiRepository).to(SauConsultaMapaPgiRepository)

    logger.info('Binding: Todos M??dulos carregados corretamente')
  } catch (error) {
    logger.error(`Binding Erro: ${error}`)
  }
})
