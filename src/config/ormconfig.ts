import { createConnection, Connection } from 'typeorm'
const config = require('./config')()
const oracledb = require('oracledb')

try {
  oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_3'});
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}

oracledb.poolMax = 20

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
    logging: config.logging,
    maxQueryExecutionTime: 10000,
    entities,
    migrations,
    extra: {
      connectionLimit: 20
    }
  })

  conn.driver.maxAliasLength = 100

  return conn
}
