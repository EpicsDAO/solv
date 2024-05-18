import { execSync } from 'child_process'
import { relayerService } from '@/template/relayerService'

export function setupRelayerService(blockEngineUrl: string): void {
  console.log('Creating Relayer Service configuration for Jito Solana')
  const result = relayerService(blockEngineUrl)
  // Use sudo tee to write the file with superuser privileges
  execSync(`echo "${result.body}" | sudo tee ${result.filePath} > /dev/null`)
  console.log('relayer.service configuration created.')
}
