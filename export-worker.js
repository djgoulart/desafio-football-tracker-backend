// exportWorker.ts
import { parentPort } from 'worker_threads'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import { prisma } from '@/lib/prisma'

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY, // Assegura que quebras de linha são tratadas corretamente
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SPREADSHEET_ID,
  serviceAccountAuth,
)

async function exportDataToGoogleSpreadsheet(data) {
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]

  await sheet.clearRows()
  await sheet.addRows([...data])
}

function calculateScore(statistics, eventsParticipation) {
  const { goals, assists } = statistics.reduce(
    (accumulator, current) => ({
      goals: accumulator.goals + current.goals,
      assists: accumulator.assists + current.assists,
    }),
    { goals: 0, assists: 0 },
  )

  return {
    goals,
    assists,
    score: goals + assists + eventsParticipation * 5,
  }
}

async function exportData() {
  try {
    const output = await prisma.player.findMany({
      include: {
        statistics: true,
        events: true,
      },
    })

    const players = output.map((player) => {
      const { score, goals, assists } = calculateScore(
        player.statistics,
        player.events.length,
      )
      return {
        id: player.id,
        name: player.name,
        tier: score < 15 ? 'Bronze' : score < 30 ? 'Prata' : 'Ouro',
        score,
        goals,
        assists,
        events: player.events.length,
        age: player.age || '--',
        birth: player.birthDate || '--',
        city: player.birthPlace || '--',
        country: player.birthCountry || '--',
        height: player.height || '--',
        weight: player.weight || '--',
        photo: player.photo || '--',
      }
    })

    await prisma.exportLog.create({
      data: {
        rows: players.length,
        type: 'RUNNING',
      },
    })

    await exportDataToGoogleSpreadsheet(players)

    parentPort?.postMessage('Exportação concluída com sucesso')
    await prisma.exportLog.create({
      data: {
        rows: players.length,
        type: 'SUCCESS',
      },
    })
  } catch (error) {
    await prisma.exportLog.create({
      data: {
        rows: 0,
        type: 'ERROR',
      },
    })

    parentPort?.postMessage(`Erro na exportação: ${error.message}`)
  }
}

exportData()
