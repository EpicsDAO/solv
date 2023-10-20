import { SOL_SERVICE_PATH } from '@/config'
import { solvService } from '@/template/solvService'
import { existsSync } from 'fs'
import { execSync } from 'child_process'

export function setupSolvService(): void {
  console.log('Creating solvService configuration for solana')

  if (existsSync(SOL_SERVICE_PATH)) {
    console.log(
      'SOL_SERVICE_PATH already exists. Skipping solvService configuration.'
    )
  } else {
    const body = solvService()
    // Use sudo tee to write the file with superuser privileges
    execSync(`echo "${body}" | sudo tee ${SOL_SERVICE_PATH} > /dev/null`)
    console.log('solv.service configuration created.')
  }
}
