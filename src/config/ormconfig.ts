import { createConnection, Connection } from 'typeorm'
import { logger } from '../util/logger'
const config = require('./config')()

const migrations = []
const entities = [`${config.path}/entities/*.${config.extension}`]

export async function getDbConnection(): Promise<Connection> {
  const conn = await createConnection({
    name: config.name,
    type: config.type,
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    sid: config.sid,
    synchronize: false,
    logging: ['error', 'schema'],
    maxQueryExecutionTime: 1000,
    entities,
    migrations,
    extra: {
      connectionLimit: 20
    }
  })

  conn.driver.maxAliasLength = 100

  return conn
}
