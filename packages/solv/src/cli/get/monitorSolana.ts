import { startupScriptPaths } from '@/config/config'
import { spawnSync } from 'child_process'

export const monitorSolana = () => {
  const { ledger } = startupScriptPaths()
  const cmd = `solana-validator --ledger ${ledger} monitor`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
