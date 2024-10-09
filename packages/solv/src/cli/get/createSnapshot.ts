import { LEDGER_PATH } from '@/config/constants'
import { spawnSync } from 'node:child_process'

const createSnapshot = (slot = '296876255', ledgerPath = LEDGER_PATH) => {
  try {
    const cmd = `agave-ledger-tool --ledger ${ledgerPath} create-snapshot \
    --snapshot-archive-path  ${ledgerPath} \
    --hard-fork ${slot} \
    --  ${slot} ${ledgerPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`createSnapshot: ${error}`)
  }
}

export default createSnapshot
