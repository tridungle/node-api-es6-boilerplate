import express from 'express'

const Auth = express.Router({ mergeParams: true })
Auth.get('/me', (req, res) =>
  res.send({
    code: 200,
    message: 'No data available',
    data: {
      uptime: process.uptime(),
      timestamp: Date.now()
    }
  })
)

export default Auth
