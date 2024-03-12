import { env } from './env'
import { app } from './app'

app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .then(() => {
    console.log(env.NODE_ENV)
    console.log('HTTP Server Running!')
  })
