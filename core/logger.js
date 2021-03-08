import winston from 'winston'
import Config from '@app/config'

class Logger {
  constructor() {
    this.transports = []
    const logFormat = winston.format.printf(
      (info) => `[${info.label}] ${info.timestamp} ${info.level}: ${info.message}`
    )
    const environment = Config.get('app.environment', 'development')
    if (environment !== 'development') {
      this.transports.push(
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), logFormat)
        })
      )
    } else {
      this.transports.push(
        new winston.transports.Console({
          format: winston.format.combine(winston.format.cli(), winston.format.splat(), logFormat)
        })
      )
    }
  }

  /**
   * @description logger
   * @memberof module:Core
   */
  initLogger() {
    this.logInstance = winston.createLogger({
      level: Config.get('log.logLevel'),
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.label({ label: Config.get('log.name') }),
        winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      transports: this.transports
    })
    return this
  }
}
export default new Logger()
