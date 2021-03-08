/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@app/core/env'

const databaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  | DB_CONNECTION_MODE: uri or credentials
  | 
  |
  */
  mode: Env.get('DB_CONNECTION_MODE', 'URI'),
  modes: {
    uri: Env.get('DB_CONNECTION_STRING', ''),
    credentials: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', 27017),
      user: Env.get('DB_USER', 'admin'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis'),
      authSource: Env.get('DB_AUTH_SOURCE', '')
    }
  },
  connectionTimeout: Env.get('DB_CONNECTION_TIMEOUT', 10000),
  maxAttemptConnection: Env.get('DB_MAX_ATTEMPT_CONNECTION', 10),
  options: {
    healthCheck: Env.get('DB_HEALTH_CHECK', false),
    debug: Env.get('DB_DEBUG', false),
    useNewUrlParser: Env.get('DB_USE_NEW_URL_PARSER', true),
    useCreateIndex: Env.get('DB_USE_CREATE_INDEX', true),
    autoIndex: Env.get('DB_AUTO_INDEX', true),
    poolSize: Env.get('DB_POOL_SIZE', 50),
    bufferMaxEntries: Env.get('DB_BUFFER_MAX_ENTRIES', 0),
    keepAlive: Env.get('DB_KEEP_ALIVE', 120),
    useUnifiedTopology: Env.get('DB_USE_UNIFIED_TOPOLOGY', true),
    useFindAndModify: Env.get('DB_USE_FIND_AND_MODIFY', false)
    // reconnectTries: Env.get('DB_RECONNECT_TRY', 60),
    // reconnectInterval: Env.get('DB_RECONNECT_INTERVAL', 2000)
  }
}

export default databaseConfig
