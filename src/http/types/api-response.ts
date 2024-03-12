/* eslint-disable @typescript-eslint/no-explicit-any */

export interface PlayerStatistics {
  team: {
    id: number
    name: string
    logo: string
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
  }
  games: {
    appearences: number
    lineups: number
    minutes: number
    number: number | null
    position: string
    rating: string
    captain: boolean
  }
  substitutes: {
    in: number
    out: number
    bench: number
  }
  shots: {
    total: number
    on: number
  }
  goals: {
    total: number
    conceded: number | null
    assists: number
    saves: number
  }
  passes: {
    total: number
    key: number
    accuracy: number
  }
  tackles: {
    total: number
    blocks: number
    interceptions: number
  }
  duels: {
    total: number | null
    won: number | null
  }
  dribbles: {
    attempts: number
    success: number
    past: number | null
  }
  fouls: {
    drawn: number
    committed: number
  }
  cards: {
    yellow: number
    yellowred: number
    red: number
  }
  penalty: {
    won: number
    commited: number | null
    scored: number
    missed: number
    saved: number | null
  }
}

export interface PlayerResponse {
  player: {
    id: number
    name: string
    firstname: string
    lastname: string
    age: number
    birth: {
      date: string
      place: string
      country: string
    }
    nationality: string
    height: string
    weight: string
    injured: boolean
    photo: string
  }
  statistics: PlayerStatistics[]
}

export interface ApiResponse {
  get: string
  parameters: {
    id: string
    season: string
  }
  errors: any[]
  results: number
  paging: {
    current: number
    total: number
  }
  response: PlayerResponse[]
}
