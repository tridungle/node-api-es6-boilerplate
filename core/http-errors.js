export class HTTPClientError extends Error {
  constructor(message) {
    if (message instanceof Object) {
      super(JSON.stringify(message))
    } else {
      super(message)
    }
    // this.stack = new Error().stack;
  }
}

export class HTTP404Error extends HTTPClientError {
  statusCode = 404

  constructor(message = 'Not found') {
    super(message)
  }
}

export const NotFound = () => {
  throw new HTTP404Error('Method not found')
}

export const ClientError = (error, response, next) => {
  if (error instanceof HTTPClientError) {
    response.status(error.statusCode).json({ code: error.statusCode, error: error.message })
  } else {
    next(error)
  }
}

export const ServerError = (error, request, response) => {
  if (process.env.NODE_ENV === 'production') {
    response.status(500).json({ code: 500, error: 'Internal Server Error' })
  } else {
    response.status(500).json({ code: 500, error: error.stack })
  }
}
