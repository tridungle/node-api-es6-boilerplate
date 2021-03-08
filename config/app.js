import proxyAddr from 'proxy-addr'
import Env from '@app/core/env'

const appConfig = {
  environment: Env.get('NODE_ENV', 'development'),
  healthEndpoint: Env.get('HEALTH_ENDPOINT', '/healthcheck'),
  host: Env.get('HOST', 'localhost'),
  port: Env.get('PORT', 5000),
  apiPrefix: Env.get('API_PREFIX', '/api/v1/'),
  /*
  |--------------------------------------------------------------------------
  | Rate Limit
  |--------------------------------------------------------------------------
  */
  rateLimit: {
    WINDOW_MS: Env.get('WINDOW_MS', 15 * 60 * 1000), // 15 munites
    MAX_CONNECTIONS: Env.get('MAX_NUMBER_OF_CONNECTIONS_DURING_WINDOW_MS', 10), // start blocking after 10 requests
    MESSAGE: Env.get('RATE_LIMIT_MESSAGE', 'Too many accounts created from this IP, please try again after 15 munites')
  },

  /*
  |--------------------------------------------------------------------------
  | Application secret key
  |--------------------------------------------------------------------------
  |
  | The secret to encrypt and sign different values in your application.
  | Make sure to keep the `APP_KEY` as an environment variable and secure.
  |
  | Note: Changing the application key for an existing app will make all
  | the cookies invalid and also the existing encrypted data will not
  | be decrypted.
  |
  */
  appKey: Env.get('APP_KEY'),

  /*
  |--------------------------------------------------------------------------
  | Http server configuration
  |--------------------------------------------------------------------------
  |
  | The configuration for the HTTP(s) server. Make sure to go through all
  | the config properties to make keep server secure.
  |
  */
  http: {
    /*
    |--------------------------------------------------------------------------
    | Allow method spoofing
    |--------------------------------------------------------------------------
    |
    | Method spoofing enables defining custom HTTP methods using a query string
    | `_method`. This is usually required when you are making traditional
    | form requests and wants to use HTTP verbs like `PUT`, `DELETE` and
    | so on.
    |
    */
    allowMethodSpoofing: false,

    /*
    |--------------------------------------------------------------------------
    | Subdomain offset
    |--------------------------------------------------------------------------
    */
    subdomainOffset: 2,

    /*
    |--------------------------------------------------------------------------
    | Request Ids
    |--------------------------------------------------------------------------
    |
    | Setting this value to `true` will generate a unique request id for each
    | HTTP request and set it as `x-request-id` header.
    |
    */
    generateRequestId: false,

    /*
    |--------------------------------------------------------------------------
    | Trusting proxy servers
    |--------------------------------------------------------------------------
    |
    | Define the proxy servers that AdonisJs must trust for reading `X-Forwarded`
    | headers.
    |
    */
    trustProxy: proxyAddr.compile('loopback'),

    /*
    |--------------------------------------------------------------------------
    | Generating Etag
    |--------------------------------------------------------------------------
    |
    | Whether or not to generate an etag for every response.
    |
    */
    etag: false,

    /*
    |--------------------------------------------------------------------------
    | JSONP Callback
    |--------------------------------------------------------------------------
    */
    jsonpCallbackName: 'callback',

    /*
    |--------------------------------------------------------------------------
    | Cookie settings
    |--------------------------------------------------------------------------
    */
    cookie: {
      domain: '',
      path: '/',
      maxAge: '2h',
      httpOnly: true,
      secure: false,
      sameSite: false
    },

    /*
    |--------------------------------------------------------------------------
    | Force content negotiation to JSON
    |--------------------------------------------------------------------------
    |
    | The internals of the framework relies on the content negotiation to
    | detect the best possible response type for a given HTTP request.
    |
    | However, it is a very common these days that API servers always wants to
    | make response in JSON regardless of the existence of the `Accept` header.
    |
    | By setting `forceContentNegotiationToJSON = true`, you negotiate with the
    | server in advance to always return JSON without relying on the client
    | to set the header explicitly.
    |
    */
    forceContentNegotiationToJSON: true
  },

  /*
  |--------------------------------------------------------------------------
  | Profiler
  |--------------------------------------------------------------------------
  */
  profiler: {
    /*
    |--------------------------------------------------------------------------
    | Toggle profiler
    |--------------------------------------------------------------------------
    |
    | Enable or disable profiler
    |
    */
    enabled: true,

    /*
    |--------------------------------------------------------------------------
    | Blacklist actions/row labels
    |--------------------------------------------------------------------------
    |
    | Define an array of actions or row labels that you want to disable from
    | getting profiled.
    |
    */
    blacklist: [],

    /*
    |--------------------------------------------------------------------------
    | Whitelist actions/row labels
    |--------------------------------------------------------------------------
    |
    | Define an array of actions or row labels that you want to whitelist for
    | the profiler. When whitelist is defined, then `blacklist` is ignored.
    |
    */
    whitelist: []
  }
}
export default appConfig
