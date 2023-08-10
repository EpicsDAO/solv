import { spawnSync } from 'child_process'
import { LEDGER_PATH } from '../..'

export const update = async () => {
  await updateVersion('1.16.7')
  await monitorUpdate(10)
}

export const updateVersion = async (version: string) => {
  const cmd = [
    `sh -c "$(curl -sSfL https://release.solana.com/v${version}/install)"`,
  ]
  spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
}

export const monitorUpdate = async (maxDelinquentStake: number) => {
  const cmd = [
    `solana-validator --ledger ${LEDGER_PATH} exit --max-delinquent-stake ${maxDelinquentStake} --monitor`,
  ]
  spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
}
