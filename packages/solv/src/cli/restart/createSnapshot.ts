import { MT_PATHS } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { spawnSync } from 'child_process'

export const createSnapshot = (solvConfig: ConfigParams) => {
  try {
    const ledgerPath = solvConfig.config.LEDGER_PATH
    const cmd = `solana-ledger-tool -l ${ledgerPath} \
    --snapshot-archive-path ${ledgerPath} \
    --incremental-snapshot-archive-path ${ledgerPath} \
    create-snapshot 254108256 ${ledgerPath} \
    --hard-fork 254108256 \
    --deactivate-feature-gate EJJewYSddEEtSZHiqugnvhQHiWyZKjkFDQASd7oKSagn`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`createSnapshot: ${error}`)
  }
}
