import { ApiResponse } from '@/http/types/api-response'
import { fetchData } from './fetch-data'
import { sendWebhookNotification } from './notify'
import { getLastSuccessfulLog, savePlayer } from './persist-data'
import { persistLog } from './persist-log'
import { LogType } from '@prisma/client'

const baseUrl = process.env.FOOTBALL_API_URL || ''
const webhookUrl = process.env.FRONTEND_SYNC_WEBHOOK || ''
const maxRequestsPerMinute = 3
const requestInterval = 60000 / maxRequestsPerMinute
let currentPage = 1
let totalPages: number | null = null
let paused = true

export const startProcess = async () => {
  if (!paused) {
    return new Error('Process is already running')
  }

  console.log('Iniciando...')
  console.log('Verificando a última página salva com sucesso...')

  const lastPage = await getLastSuccessfulLog()
  if (lastPage) {
    console.log(`A última página salva com sucesso foi ${lastPage.page}.`)
    console.log(
      `Continuando a execução a partir a página ${lastPage.page + 1}.`,
    )
    currentPage = lastPage.page + 1
  }

  paused = false
  processData()
  return { message: 'Execução iniciada.' }
}

export const stopProcess = async () => {
  if (paused) {
    return new Error('Process is already stopped')
  }

  paused = true
  console.log('Pausando a execução...')
  processData()
  return { message: 'Execução interrompida.' }
}

export const checkProcess = async () => {
  if (paused) return 'stopped'

  return 'running'
}

const processData = async () => {
  if (!paused) {
    try {
      console.log('fetching page', currentPage)

      const data: ApiResponse = await fetchData(baseUrl, currentPage)

      data.response.map(async (item) => {
        const persistResult = await savePlayer({
          player: {
            ...item.player,
            birth: {
              ...item.player.birth,
              date: new Date(item.player.birth.date).toISOString(),
            },
          },
          statistics: [...item.statistics],
        })

        if (persistResult instanceof Error) {
          throw persistResult
        }
      })

      await persistLog({
        page: data.paging.current,
        rows: data.response.length,
        type: LogType.SUCCESS,
      })

      await sendWebhookNotification(
        webhookUrl,
        JSON.stringify({
          total: data.results,
          page: data.paging.current,
          records_saved: data.response.length,
        }),
      )

      if (totalPages === null) {
        const maxRecords = data.paging.total
        totalPages = Math.ceil(maxRecords / 20) - 1
        console.log('total pages', totalPages)
      }

      currentPage++

      if (currentPage <= totalPages) {
        setTimeout(processData, requestInterval)
      } else {
        console.log('Todas as páginas foram processadas.')
        paused = true
      }
    } catch (error) {
      await persistLog({
        page: currentPage,
        rows: 20,
        type: 'ERROR',
      })
      console.error(
        `Erro ao processar a página ${currentPage}: ${error.message}`,
      )
      setTimeout(processData, requestInterval)
    }
  }
}
