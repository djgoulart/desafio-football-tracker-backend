import { Player, SyncLog } from '@prisma/client'

import { PlayerResponse } from '@/http/types/api-response'
import { prisma } from '@/lib/prisma'

export const savePlayer = async ({
  player,
  statistics,
}: PlayerResponse): Promise<Player | Error> => {
  try {
    return await prisma.player.upsert({
      where: {
        apiId: player.id,
      },
      create: {
        apiId: player.id,
        name: player.name,
        firstName: player.firstname,
        lastName: player.lastname,
        age: player.age,
        birthCountry: player.birth.country,
        birthDate: player.birth.date,
        birthPlace: player.birth.place,
        height: player.height,
        weight: player.weight,
        nationality: player.nationality,
        injuried: player.injured,
        photo: player.photo,
        statistics: {
          createMany: {
            data: statistics.map((item) => {
              return {
                teamId: item.team.id,
                teamName: item.team.name,
                teamLogo: item.team.logo,
                leagueId: item.league.id,
                leagueName: item.league.name,
                leagueFlag: item.league.flag,
                leagueLogo: item.league.logo,
                leagueCountry: item.league.country,
                leagueSeason: Number(item.league.season),
                goals: item.goals.total || 0,
                assists: item.goals.assists || 0,
                score: item.goals.total + item.goals.assists,
              }
            }),
          },
        },
      },
      update: {
        apiId: player.id,
        name: player.name,
        firstName: player.firstname,
        lastName: player.lastname,
        age: player.age,
        birthCountry: player.birth.country,
        birthDate: player.birth.date,
        birthPlace: player.birth.place,
        height: player.height,
        weight: player.weight,
        nationality: player.nationality,
        injuried: player.injured,
        photo: player.photo,
        statistics: {
          createMany: {
            data: statistics.map((item) => {
              return {
                teamId: item.team.id,
                teamName: item.team.name,
                teamLogo: item.team.logo,
                leagueId: item.league.id,
                leagueName: item.league.name,
                leagueFlag: item.league.flag,
                leagueLogo: item.league.logo,
                leagueCountry: item.league.country,
                leagueSeason: Number(item.league.season),
                goals: item.goals.total || 0,
                assists: item.goals.assists || 0,
                score: item.goals.total + item.goals.assists,
              }
            }),
          },
        },
      },
    })
  } catch (error) {
    return new Error(error.message)
  }
}

export const getLastSuccessfulLog = async (): Promise<SyncLog | null> => {
  const output = await prisma.syncLog.findFirst({
    where: {
      type: 'SUCCESS',
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return output
}
