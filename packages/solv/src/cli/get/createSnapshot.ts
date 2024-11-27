import { LEDGER_PATH } from '@/config/constants'
import { DefaultConfigType } from '@/config/types'
import { spawnSync } from 'node:child_process'

const createSnapshot = (slot = '296877183', ledgerPath = LEDGER_PATH, config: DefaultConfigType) => {
  try {
    const cmd = `agave-ledger-tool --ledger ${ledgerPath} create-snapshot \
--incremental \
--snapshot-archive-path  ${config.SNAPSHOTS_PATH} \
--hard-fork ${slot} \
--deactivate-feature-gate \
7uZBkJXJ1HkuP6R3MJfZs7mLwymBcDbKdqbF51ZWLier \
tvcF6b1TRz353zKuhBjinZkKzjmihXmBAHJdjNYw1sQ \
decoMktMcnmiq6t3u7g5BfgcQu91nKZr6RvMYf9z1Jb \
--  ${slot} ${ledgerPath}`
    const result = spawnSync(cmd, {
      shell: true,
      stdio: 'pipe',
      cwd: ledgerPath,
    })
    if (result.status !== 0) {
      throw new Error(`createSnapshot: ${result.error}`)
    }
  } catch (error) {
    throw new Error(`createSnapshot: ${error}`)
  }
}
export default createSnapshot
