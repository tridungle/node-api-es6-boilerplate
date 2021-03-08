import { Router } from 'express'
import auth from '@app/start/routes/auth'

const Route = Router()

Route.get('/', (req, res) =>
  res.send({
    message: 'Hello world!',
    name: 'api',
    metadata: {
      uptime: process.uptime(),
      timestamp: Date.now(),
      version: '0.0.1'
    }
  })
)
Route.use('/auth', auth)

export default Route
