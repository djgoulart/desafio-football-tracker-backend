export const fetchData = async (baseUrl: string, currentPage: number) => {
  const response = await fetch(`${baseUrl}&page=${currentPage}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-apisports-key': process.env.FOOTBALL_API_KEY || '',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`)
  }
  return await response.json()
}
