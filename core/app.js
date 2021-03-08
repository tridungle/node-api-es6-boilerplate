import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import ExpressRateLimit from 'express-rate-limit'

import Config from '@app/config'
import Logger from '@app/core/logger'
import Routes from '@app/start/routes'
import Database from '@app/core/db'
import { NotFound, ClientError, ServerError } from '@app/core/http-errors'

class Application {
  constructor(app) {
    this.app = app
  }

  async setup() {
    process.setMaxListeners(0)
    this.logger = Logger.initLogger().logInstance
    this.inDev = Config.get('app.environment', true)
    this.config = Config.get('app')
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(cookieParser())
    this.app.use(cors())
    this.app.use(helmet())

    // enable limit repeated requests
    this.app.use(
      new ExpressRateLimit({
        windowMs: this.config.rateLimit.WINDOW_MS,
        max: this.config.rateLimit.MAX_CONNECTIONS,
        message: this.config.rateLimit.MESSAGE
      })
    )
    this.bootRouterError()
    return this
  }

  bootDatabase() {
    this.logger.info('🚀 Boot the database')
    Database.connect()
  }

  bootRootDefaultRoutes() {
    this.logger.info('🚀 Boot the default routes')
    this.app.get(Config.get('app.healthEndpoint'), this.healthCheckHandler)
  }

  bootRootRoutes() {
    this.logger.info('🚀 Boot the application routes')
    this.app.use(Config.get('app.apiPrefix'), Routes)
  }

  healthCheckHandler(req, res) {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    }
    try {
      res.send(healthcheck)
    } catch (e) {
      healthcheck.message = e
      res.status(503).send()
    }
  }

  bootRouterError = () => {
    this.app.use('/', NotFound)
    this.app.use('/', ClientError)
    this.app.use('/', ServerError)
  }
}
export default Application
