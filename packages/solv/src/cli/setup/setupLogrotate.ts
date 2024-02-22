import { logRotates } from '@/template/logRotates'
import { existsSync } from 'fs'
import { execSync } from 'child_process'
import { SERVICE_PATHS } from '@/config/config'

export function setupLogrotate(): void {
  console.log('Creating logrotate configuration for solana')

  if (existsSync(SERVICE_PATHS.SOL_LOGROTATE)) {
    console.log(
      'SOL_LOGROTATE_PATH already exists. Skipping logrotate configuration.'
    )
  } else {
    const body = logRotates()
    // Use sudo tee to write the file with superuser privileges
    execSync(
      `echo "${body}" | sudo tee ${SERVICE_PATHS.SOL_LOGROTATE} > /dev/null`
    )
    console.log('Logrotate configuration created.')
  }
}
