import { AGAVE_VALIDATOR, LEDGER_PATH } from '@/config/constants'
import { spawnSync } from 'child_process'
import installAgave from '../install/installAgave'
import getSolanaCLI from '@/config/getSolanaCLI'

export const updateVersion = async (version: string) => {
  const solanaCLI = getSolanaCLI()
  if (solanaCLI === AGAVE_VALIDATOR) {
    installAgave(version)
    return
  }
  const cmd = [
    `sh -c "$(curl -sSfL https://release.solana.com/v${version}/install)"`,
  ]
  spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
}

export const monitorUpdate = async (
  maxDelinquentStake: number,
  noMonitor = false,
) => {
  const solanaValidatorClient = getSolanaCLI()
  let cmd = `${solanaValidatorClient} --ledger ${LEDGER_PATH} exit --max-delinquent-stake ${maxDelinquentStake} --monitor`
  if (noMonitor) {
    cmd = `${solanaValidatorClient} --ledger ${LEDGER_PATH} exit --max-delinquent-stake ${maxDelinquentStake}`
  }
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
