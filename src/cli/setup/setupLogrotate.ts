import { SOL_LOGROTATE_PATH } from '@/config'
import { logRotates } from '@/template/logRotates'
import { existsSync } from 'fs'
import { execSync } from 'child_process'

export function setupLogrotate(): void {
  console.log('Creating logrotate configuration for solana')

  if (existsSync(SOL_LOGROTATE_PATH)) {
    console.log(
      'SOL_LOGROTATE_PATH already exists. Skipping logrotate configuration.'
    )
  } else {
    const body = logRotates()
    // Use sudo tee to write the file with superuser privileges
    execSync(`echo "${body}" | sudo tee ${SOL_LOGROTATE_PATH} > /dev/null`)
    console.log('Logrotate configuration created.')
  }
}
