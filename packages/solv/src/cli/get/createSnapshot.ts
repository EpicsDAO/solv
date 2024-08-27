import { spawnSync } from 'node:child_process'

const createSnapshot = async () => {
  const cmd = `agave-ledger-tool --ledger /mnt/ledger create-snapshot \
--snapshot-archive-path  /mnt/ledger/snapshot \
--hard-fork 289624982 \
--  289624982 /mnt/ledger/snapshot`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}

export default createSnapshot
