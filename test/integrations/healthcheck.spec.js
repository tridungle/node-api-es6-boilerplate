import helpers from '@app/test/helpers'

let server
beforeAll(async () => {
  server = await helpers.httpServer.start()
})

beforeEach(async () => {
  jest.setTimeout(5000)
})

describe('Healthcheck', () => {
  it('should returns 200 if server is healthy', async () => {
    const response = await server.makeRequest().get(`/healthcheck`).expect(200)
    expect(response.body.uptime).toBeGreaterThan(0)
    expect(response.body.timestamp).toBeGreaterThan(0)
    expect(response.body.message).toEqual('OK')
  })
})
