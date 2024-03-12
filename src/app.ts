import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'
import { syncRoutes } from './routes/sync'
import { exportRoutes } from './routes/export'

export const app = fastify()

app.register(syncRoutes)
app.register(exportRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    console.error('Validation error', error.format())
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should send the error to an external tool like Datadog
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
