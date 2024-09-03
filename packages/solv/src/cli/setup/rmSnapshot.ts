import { spawnSync } from 'node:child_process'

export const rmSnapshot = () => {
  spawnSync(`sudo rm -rf /mnt/ledger/*`, {
    shell: true,
    stdio: 'inherit',
  })
  spawnSync(`sudo rm -rf /mnt/accounts/*`, {
    shell: true,
    stdio: 'inherit',
  })
}
