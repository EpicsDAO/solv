import { LEDGER_PATH } from '@/config'
import { spawnSync } from 'child_process'

export const updateVersion = (version: string) => {
  const cmd = [
    `sh -c "$(curl -sSfL https://release.solana.com/v${version}/install)"`,
  ]
  spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
}

export const monitorUpdate = (
  maxDelinquentStake: number,
  noMonitor = false
) => {
  let cmd = `solana-validator --ledger ${LEDGER_PATH} exit --max-delinquent-stake ${maxDelinquentStake} --monitor`
  if (noMonitor) {
    cmd = `solana-validator --ledger ${LEDGER_PATH} exit --max-delinquent-stake ${maxDelinquentStake}`
  }
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
