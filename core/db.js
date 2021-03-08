import mongoose from 'mongoose'
import Logger from '@app/core/logger'
import Config from '@app/config'

class MongoConnection {
  constructor() {
    this.logger = Logger.initLogger().logInstance
    mongoose.Promise = Promise
  }

  connect = async () => {
    let mongodbURI = Config.get('database.modes.uri')
    const connectionMode = Config.get('constants.database.connectionMode')
    const mode = Config.get('database.mode')
    if (mode && mode === connectionMode.CREDENTIALS) mongodbURI = this.buildConnectionString()
    if (!mongodbURI) {
      this.logger.info('💥 MONGODB_URI is not specified.')
      process.exit()
    }
    const options = Config.get('database.options')
    const error = await mongoose.connect(mongodbURI, options).catch((e) => e)
    if (error) {
      this.logger.log({ level: 'error', message: `💥 Mongodb connection error ${error}` })
    }
    this.subscribeConnectionEmitter()
    return this
  }

  buildConnectionString = () => {
    const credentials = Config.get('database.modes.credentials')
    if (!credentials || (credentials && (!credentials.user || !credentials.password)))
      throw new Error('💥 Database credentials are not specified')
    const connectionString = `mongodb://${credentials.user}:${credentials.password}@${credentials.host}:${credentials.port}/${credentials.database}`
    if (credentials.authSource) return `${connectionString}?authSource=${credentials.authSource}`
    return connectionString
  }

  subscribeConnectionEmitter = () => {
    const { connection } = mongoose
    connection.on('error', (err) => {
      this.logger.log({ level: 'error', message: `💥 MongoDB connection error: ${err}` })
      mongoose.disconnect()
    })
    connection.on('connected', () => {
      this.logger.info('💥 Connected to MongoDB!')
    })
    connection.on('disconnected', async () => {
      this.logger.info(`💥 MongoDB disconnected!`)
    })
  }
}
export default new MongoConnection()
