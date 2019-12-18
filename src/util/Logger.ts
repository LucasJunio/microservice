import { Logger, createLogger, transports, format } from 'winston'
const { combine, colorize, simple } = format

export const logger: Logger = createLogger({
  exitOnError: false,
  transports: [new transports.Console(), new transports.File({ filename: 'access.log', level: 'error' })],
  format: combine(colorize(), simple())
})
