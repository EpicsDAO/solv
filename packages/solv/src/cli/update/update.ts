import { NETWORK_TYPES } from '@/config/config'
import {
  AGAVE_VALIDATOR,
  LEDGER_PATH,
  SOLANA_VALIDATOR,
} from '@/config/constants'
import { readOrCreateDefaultConfig } from '@/lib/readOrCreateDefaultConfig'
import { spawnSync } from 'child_process'
import installAgave from '../install/installAgave'

export const updateVersion = (version: string) => {
  const config = readOrCreateDefaultConfig()
  const isTestnet = config.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
  if (isTestnet) {
    installAgave(version)
    return
  }
  const cmd = [
    `sh -c "$(curl -sSfL https://release.solana.com/v${version}/install)"`,
  ]
  spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
}

export const monitorUpdate = (
  maxDelinquentStake: number,
  noMonitor = false,
) => {
  const config = readOrCreateDefaultConfig()
  const isTestnet = config.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
  const solanaValidatorClient = isTestnet ? AGAVE_VALIDATOR : SOLANA_VALIDATOR
  let cmd = `${solanaValidatorClient} --ledger ${LEDGER_PATH} exit --max-delinquent-stake ${maxDelinquentStake} --monitor`
  if (noMonitor) {
    cmd = `${solanaValidatorClient} --ledger ${LEDGER_PATH} exit --max-delinquent-stake ${maxDelinquentStake}`
  }
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
