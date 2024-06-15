import { MT_PATHS } from '@/config/config'
import { spawnSync } from 'node:child_process'

export const getSnapshot = (isTest = false, minDonwloadSpeed = '45') => {
  try {
    const ledgerPath = MT_PATHS.LEDGER
    let cmd = `docker run -it --rm -v ${ledgerPath}:${ledgerPath}/snapshot --user $(id -u):$(id -g) c29r3/solana-snapshot-finder:latest --snapshot_path ${ledgerPath}/snapshot --min_download_speed ${minDonwloadSpeed}`
    if (isTest) {
      spawnSync(
        `wget --trust-server-names https://snapshots.avorio.network/testnet/snapshot.tar.bz2 https://snapshots.avorio.network/testnet/incremental-snapshot.tar.bz2`,
        { shell: true, stdio: 'inherit', cwd: '/mnt/ledger' },
      )
      return
    }
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`getSnapshot Error: ${error}`)
  }
}
