import express from 'express'
import Application from '@app/core/app'
import ErrorHandler from '@app/core/error-handler'

class Server {
  constructor() {
    this.server = express()
    this.application = new Application(this.server)
  }

  async start() {
    try {
      await this.wire()
      await this.listen()
    } catch (error) {
      console.error(error)
      await new ErrorHandler(this.application).handleError(error)
    }
    return this
  }

  async wire() {
    await this.application.setup()
    await this.application.bootDatabase()
    await this.application.bootRootDefaultRoutes()
    await this.application.bootRootRoutes()
  }

  async listen() {
    this.server.listen(this.application.config.port, this.monitorHttpServer)
    return this
  }

  monitorHttpServer = (error) => {
    if (error) {
      this.application.logger.error(error)
      return
    }
    const { environment, port, host, healthEndpoint } = this.application.config
    this.application.logger.info('==================================')
    this.application.logger.info(`Environment: ${environment}`)
    this.application.logger.info(`Server listening on port ${port}`)
    this.application.logger.info(`Health checks available at http://${host}:${port}${healthEndpoint}`)
    if (process.send) {
      process.send({ origin: 'api-server', ready: true, port, host })
    }
  }
}

export default new Server()
