import { useWorkerForExport } from '@/services/worker'

export async function exportPlayers() {
  try {
    useWorkerForExport()
    return { ok: true }
  } catch (error) {
    console.error(error)
  }
}
