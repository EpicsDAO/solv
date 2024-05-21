import { MT_PATHS } from '@/config/config'
import { spawnSync } from 'node:child_process'

export const getSnapshot = (isTest = false) => {
  try {
    const ledgerPath = MT_PATHS.LEDGER + '/snapshot'
    let cmd = `docker run -it --rm -v ${MT_PATHS.LEDGER}:${ledgerPath} --user $(id -u):$(id -g) c29r3/solana-snapshot-finder:latest --snapshot_path ${ledgerPath}`
    if (isTest) {
      cmd = cmd + ' -r http://api.testnet.solana.com'
    }
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`getSnapshot Error: ${error}`)
  }
}
