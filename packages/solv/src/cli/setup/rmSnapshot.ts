import { DefaultConfigType } from '@/config/types'
import { spawnSync } from 'node:child_process'

export const rmSnapshot = (config: DefaultConfigType) => {
  spawnSync(`sudo rm -rf /mnt/ledger/*`, {
    shell: true,
    stdio: 'inherit',
  })
  if(config.SNAPSHOTS_PATH !== '/mnt/ledger') {
    spawnSync(`sudo rm -rf ${config.SNAPSHOTS_PATH}/*`, {
      shell: true,
      stdio: 'inherit',
    })
  }
  spawnSync(`sudo rm -rf /mnt/accounts/*`, {
    shell: true,
    stdio: 'inherit',
  })
}
