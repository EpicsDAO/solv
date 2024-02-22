import { readOrCreateDefaultConfig } from '@/lib/readOrCreateDefaultConfig'
import { spawnSync } from 'child_process'

export const monitorSolana = () => {
  const ledger = readOrCreateDefaultConfig().config.LEDGER_PATH
  const cmd = `solana-validator --ledger ${ledger} monitor`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
