import request from 'supertest'
import expressServer from '@app/start/server'

class HttpServer {
  start = async () => {
    const { server } = await expressServer.start()
    this.app = server
    return this
  }

  makeRequest = () => {
    return request(this.app)
  }
}

export default new HttpServer()
