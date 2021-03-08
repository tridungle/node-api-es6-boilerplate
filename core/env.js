import dotenv from 'dotenv'

class Env {
  static get(key, defaultValue) {
    const env = process.env.NODE_ENV || 'development'
    dotenv.config({ path: env === 'development' ? './.env' : `./.env.${env}` })
    return process.env[key] ? process.env[key] : defaultValue
  }
}
export default Env
