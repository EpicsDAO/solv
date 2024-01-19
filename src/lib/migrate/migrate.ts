import { spawnSync } from 'child_process'
import { mvKeys } from '@/lib/migrate/mvKeys'
import { removeFstabEntries } from '@/lib/migrate/rmFstab'
import { rmServices } from '@/lib/migrate/rmServices'
import { rmMtDir } from '@/lib/migrate/rmMtDir'
import { migrateSetup } from '@/lib/migrate/migrateSetup'
import { sleep } from '@skeet-framework/utils'
import { rmSwap } from './rmSwap'

export const migrate = async () => {
  console.log('Stopping solv service...')
  spawnSync('sudo systemctl stop solv', { shell: true, stdio: 'inherit' })
  await sleep(3000)
  mvKeys()
  rmSwap()
  removeFstabEntries()
  rmServices()
  rmMtDir()
  migrateSetup()
}
