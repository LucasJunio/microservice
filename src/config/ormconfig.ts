import { createConnection, Connection } from 'typeorm'
const config = require('./config')()

const migrations = []
const entities = [`${config.path}/entities/*.${config.extension}`]

export async function getDbConnection(): Promise<Connection> {
  return createConnection({
    name: config.name,
    type: config.type,
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    sid: config.sid,
    synchronize: false,
    logging: false,
    entities,
    migrations
  })

}