import { prisma } from '@/lib/prisma'
import { LogType, SyncLog } from '@prisma/client'

type LogData = {
  page: number
  rows: number
  type: LogType
}

export const persistLog = async ({
  page,
  rows,
  type,
}: LogData): Promise<SyncLog | Error> => {
  try {
    return await prisma.syncLog.create({
      data: {
        page,
        rows,
        type,
      },
    })
  } catch (error) {
    return new Error(error.message)
  }
}
