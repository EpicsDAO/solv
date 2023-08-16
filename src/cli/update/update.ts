import { SolvConfig } from '@/types/solvTypes'
import { spawnSync } from 'child_process'

export const updateVersion = (version: string) => {
  const cmd = [
    `sh -c "$(curl -sSfL https://release.solana.com/v${version}/install)"`,
  ]
  spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
}

export const monitorUpdate = (maxDelinquentStake: number) => {
  const cmd = [
    `solana-validator --ledger ${SolvConfig.LEDGER_PATH} exit --max-delinquent-stake ${maxDelinquentStake} --monitor`,
  ]
  spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
}
