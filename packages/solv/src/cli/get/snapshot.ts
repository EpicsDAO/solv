import { MT_PATHS } from '@/config/config'
import { spawnSync } from 'node:child_process'

export const getSnapshot = (isTest = false, minDonwloadSpeed = '45') => {
  try {
    const ledgerPath = MT_PATHS.LEDGER
    let cmd = `docker run -it --rm -v ${ledgerPath}:${ledgerPath}/snapshot --user $(id -u):$(id -g) c29r3/solana-snapshot-finder:latest --snapshot_path ${ledgerPath}/snapshot --min_download_speed ${minDonwloadSpeed}`
    if (isTest) {
      cmd = cmd + ' -r http://api.testnet.solana.com'
    }
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`getSnapshot Error: ${error}`)
  }
}
