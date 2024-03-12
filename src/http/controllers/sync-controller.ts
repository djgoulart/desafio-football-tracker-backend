import { FastifyRequest, FastifyReply } from 'fastify'

import { startProcess, stopProcess, checkProcess } from '@/sync-players/sync'
import { getSyncStatus } from '@/sync-players/get-sync-status'

export async function start(request: FastifyRequest, reply: FastifyReply) {
  const startResult = await startProcess()

  return reply.status(200).send(startResult)
}

export async function stop(request: FastifyRequest, reply: FastifyReply) {
  const stopResult = await stopProcess()

  return reply.status(200).send(stopResult)
}

export async function status(request: FastifyRequest, reply: FastifyReply) {
  const { log, players } = await getSyncStatus()
  const checkResult = await checkProcess()

  return reply.status(200).send({ status: checkResult, log, players })
}
