import { Worker } from 'worker_threads'
import path from 'path'

export function useWorkerForExport() {
  return new Promise((resolve, reject) => {
    const workerPath = path.resolve(
      './',
      __dirname,
      'services',
      'export-worker.js',
    )

    const worker = new Worker(workerPath)

    worker.on('message', (message) => {
      console.log('Message from worker:', message)

      resolve(message)
    })

    worker.on('error', reject)

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}
