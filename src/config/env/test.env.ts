module.exports = {
  env: 'test',
  name: 'default',
  type: 'oracle',
  host: process.env.DATABASE_HOST || '10.214.131.106',
  port: process.env.DATABASE_PORT || 1521,
  username: process.env.DATABASE_USERNAME || 'SAU',
  password: process.env.DATABASE_PASSWORD || 'omsaudes',
  sid: process.env.DATABASE_SID || 'OMDES',
  serverPort: 4020
}
