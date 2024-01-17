import { solvService } from '@/template/solvService'
import { existsSync } from 'fs'
import { execSync } from 'child_process'
import { SERVICE_PATHS } from '@/config/config'

export function setupSolvService(): void {
  console.log('Creating solvService configuration for solana')

  if (existsSync(SERVICE_PATHS.SOL_SERVICE)) {
    console.log(
      'SOL_SERVICE_PATH already exists. Skipping solvService configuration.'
    )
  } else {
    const body = solvService()
    // Use sudo tee to write the file with superuser privileges
    execSync(
      `echo "${body}" | sudo tee ${SERVICE_PATHS.SOL_SERVICE} > /dev/null`
    )
    console.log('solv.service configuration created.')
  }
}
