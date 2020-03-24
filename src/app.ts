import 'reflect-metadata'
import * as bodyParser from 'body-parser'
import * as fs from 'fs'
import * as cors from 'cors'
import { NextFunction, Request, Response } from 'express'
import * as fileUpload from 'express-fileupload'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import * as morgan from 'morgan'
import { bindings } from './inversify.config'
import { logger } from './util/Logger'
const config = require('./config/config')()

export const Server = (async () => {
  try {
    logger.info('Starting SAU-PP-API')

    const container = new Container()
    await container.loadAsync(bindings)
    const app = new InversifyExpressServer(container)
    app.setConfig(app => {
      app.use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      app.use(
        fileUpload({
          limits: { fileSize: 300 * 1024 * 1024 }
        })
      )
      app.use(bodyParser.json())
      app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error(err.stack)
        next(err)
      })
      app.use(cors())
      app.use(
        morgan('common', {
          stream: fs.createWriteStream('./logs/access.log', { flags: 'a' })
        })
      )
      app.use(morgan('dev'))
    })
    const server = app.build()

    const port = config.serverPort || 5000
    const serverPort = normalizePort(port)

    server.listen(serverPort, () => {
      logger.info(`SAU-PP-API listening on port ${config.serverPort}!`)
    })
  } catch (error) {
    logger.error(`SAU-PP-API Initialize error: ${error}`)
  }
})()

function normalizePort(val: any): any {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}
