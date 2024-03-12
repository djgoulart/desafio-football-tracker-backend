import { prisma } from '@/lib/prisma'
import { SyncLog } from '@prisma/client'

type OutputData = {
  log: SyncLog | null
  players: number
}

export const getSyncStatus = async (): Promise<OutputData> => {
  const output = await prisma.syncLog.findFirst({
    where: {
      type: 'SUCCESS',
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const players = await prisma.player.count()

  return {
    log: output,
    players,
  }
}
