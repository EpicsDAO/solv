import { MT_PATHS } from '@/config/config'
import { spawnSync } from 'node:child_process'

export const getSnapshot = (
  isTest = false,
  minDownloadSpeed = '45',
  ledgerPath = MT_PATHS.LEDGER,
  snapshotPath = `${ledgerPath}/snapshot`,
  version: string
) => {
  try {
    let cmd = `docker run -it --rm -v ${ledgerPath}:${snapshotPath} --user $(id -u):$(id -g) c29r3/solana-snapshot-finder:latest --snapshot_path ${snapshotPath} --min_download_speed ${minDownloadSpeed} --version ${version}`
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
