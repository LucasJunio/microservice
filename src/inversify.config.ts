import { AsyncContainerModule } from 'inversify'
import { getDbConnection } from './config/ormconfig'
import { logger } from './util/Logger'

export const bindings = new AsyncContainerModule(async bind => {
  try {
    // Binding Connection
    await getDbConnection()

    // Bindin Controllers

    // Binding the repositories

    // Binding the services

    logger.info('Binding: Todos Módulos carregados corretamente')
  } catch (error) {
    logger.error(`Binding Erro: ${error}`)
  }
})
