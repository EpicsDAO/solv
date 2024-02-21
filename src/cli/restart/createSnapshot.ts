import { MT_PATHS } from '@/config/config'
import { spawnSync } from 'child_process'

export const createSnapshot = () => {
  try {
    const cmd = `solana-ledger-tool -l ${MT_PATHS.LEDGER} \
    --snapshot-archive-path ${MT_PATHS.LEDGER} \
    --incremental-snapshot-archive-path ${MT_PATHS.LEDGER} \
    create-snapshot 254108256 ${MT_PATHS.LEDGER} \
    --hard-fork 254108256 \
    --deactivate-feature-gate EJJewYSddEEtSZHiqugnvhQHiWyZKjkFDQASd7oKSagn`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`createSnapshot: ${error}`)
  }
}
