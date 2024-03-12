import { FastifyInstance } from 'fastify'

import { exportPlayers } from '@/http/controllers/export-controller'

export async function exportRoutes(app: FastifyInstance) {
  app.get('/export', exportPlayers)
}
