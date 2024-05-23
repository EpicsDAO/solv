import { spawnSync } from 'node:child_process'

export const rmSnapshot = () => {
  const cmd1 = `sudo rm -rf /mnt/ledger/rocksdb`
  const cmd2 = `sudo rm -rf /mnt/ledger/incremental-snapshot*`
  spawnSync(cmd1, { shell: true, stdio: 'inherit' })
  spawnSync(cmd2, { shell: true, stdio: 'inherit' })
  spawnSync(`sudo rm -rf /mnt/ledger/snapshot*`, {
    shell: true,
    stdio: 'inherit',
  })
  spawnSync(`sudo rm -rf /mnt/ledger/snapshot/*`, {
    shell: true,
    stdio: 'inherit',
  })
}
