import { solvService } from '@/template/solvService'

import { execSync } from 'child_process'
import { SERVICE_PATHS } from '@/config/config'

// This will overwrite the solv.service file with the new configuration to easily switch between testnet and mainnet
export function setupSolvService(isTest = true): void {
  console.log('Creating solvService configuration for solana')
  const body = solvService(isTest)
  // Use sudo tee to write the file with superuser privileges
  execSync(`echo "${body}" | sudo tee ${SERVICE_PATHS.SOL_SERVICE} > /dev/null`)
  console.log('solv.service configuration created.')
}
