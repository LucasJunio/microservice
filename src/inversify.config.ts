import { AsyncContainerModule } from 'inversify'
import { getDbConnection } from './config/ormconfig'
import { TYPE } from './constants/types'
import { logger } from './util/Logger'
import { IUsinaService, UsinaService } from './modules/v1/usina/usinaService'
import { ISauUsinaRepository, SauUsinaRepository } from './repositories/sauUsinaRepository'
import {
  ParadaProgramadaService,
  IParadaProgramadaService
} from './modules/v1/parada_programada/paradaProgramadaService'
import {
  ISauUnidadeGeradoraRepository,
  SauUnidadeGeradoraRepository
} from './repositories/sauUnidadeGeradoraRepository'
import { IUnidadeGeradoraService, UnidadeGeradoraService } from './modules/v1/unidade_geradora/unidadeGeradoraService'

export const bindings = new AsyncContainerModule(async bind => {
  try {
    // Binding Connection
    await getDbConnection()

    // Bindin Controllers
    await require('./modules/v1/parada_programada/paradaProgramadaController')
    await require('./modules/v1/usina/usinaController')

    // Binding the services
    bind<IParadaProgramadaService>(TYPE.ParadaProgramadaService).to(ParadaProgramadaService)
    bind<IUsinaService>(TYPE.UsinaService).to(UsinaService)
    bind<IUnidadeGeradoraService>(TYPE.UnidadeGeradoraService).to(UnidadeGeradoraService)

    // Binding the repositories
    bind<ISauUsinaRepository>(TYPE.SauUsinaRepository).to(SauUsinaRepository)
    bind<ISauUnidadeGeradoraRepository>(TYPE.SauUnidadeGeradoraRepository).to(SauUnidadeGeradoraRepository)

    logger.info('Binding: Todos Módulos carregados corretamente')
  } catch (error) {
    logger.error(`Binding Erro: ${error}`)
  }
})
