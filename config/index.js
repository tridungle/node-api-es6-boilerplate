import { get as _get } from 'lodash'

class Config {
  static get(path, defaultValue) {
    const paths = path.split('.')
    const [fileName, ...properties] = paths
    if (!fileName) throw new Error('Configuration file not found.')
    const filePath = `./${fileName}`
    const resolver = require(`${filePath}`)
    const configObject = resolver.default ? resolver.default : resolver
    if (!properties.length) return configObject

    const configProperty = properties.join('.')
    return _get(configObject, configProperty, defaultValue)
  }
}
export default Config
