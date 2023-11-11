import { LEDGER_PATH } from '@/config'
import { spawnSync } from 'child_process'

export const monitorSolana = () => {
  const cmd = `solana-validator --ledger ${LEDGER_PATH} monitor`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
