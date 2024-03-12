import { FastifyInstance } from 'fastify'

import { start, stop, status } from '@/http/controllers/sync-controller'

export async function syncRoutes(app: FastifyInstance) {
  app.get('/sync/start', start)
  app.get('/sync/stop', stop)
  app.get('/sync/status', status)
}
