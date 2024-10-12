import { LEDGER_PATH } from '@/config/constants'
import { spawnSync } from 'node:child_process'

const createSnapshot = (slot = '296876255', ledgerPath = LEDGER_PATH) => {
  try {
    const cmd = `agave-ledger-tool --ledger ${ledgerPath} create-snapshot \
--snapshot-archive-path  ${ledgerPath} \
--hard-fork ${slot} \
--hard-fork ${slot} \
--deactivate-feature-gate \
9bn2vTJUsUcnpiZWbu2woSKtTGW3ErZC9ERv88SDqQjK \
ed9tNscbWLYBooxWA7FE2B5KHWs8A6sxfY8EzezEcoo \
EenyoWx9UMXYKpR8mW5Jmfmy2fRjzUtM7NduYMY8bx33 \
--remove-account \
SysvarEpochRewards1111111111111111111111111 \
--enable-capitalization-change \
    --  ${slot} ${ledgerPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit', cwd: ledgerPath })
  } catch (error) {
    throw new Error(`createSnapshot: ${error}`)
  }
}
export default createSnapshot
