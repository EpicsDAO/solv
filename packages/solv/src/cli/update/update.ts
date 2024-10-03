import {
  AGAVE_VALIDATOR,
  LEDGER_PATH,
  SOLANA_VALIDATOR,
} from '@/config/constants'
import { spawnSync } from 'child_process'
import installAgave from '../install/installAgave'
import readConfig from '@/config/readConfig'
import { Network, NodeType } from '@/config/enums'

export const updateVersion = async (version: string) => {
  const config = await readConfig()
  const isTestnet = config.NETWORK === Network.TESTNET
  const isRPC = config.NODE_TYPE === NodeType.RPC
  if (isTestnet || isRPC) {
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
  const config = await readConfig()
  const isTestnet = config.NETWORK === Network.TESTNET
  const isRPC = config.NODE_TYPE === NodeType.RPC
  let solanaValidatorClient =
    isRPC || isTestnet ? AGAVE_VALIDATOR : SOLANA_VALIDATOR
  let cmd = `${solanaValidatorClient} --ledger ${LEDGER_PATH} exit --max-delinquent-stake ${maxDelinquentStake} --monitor`
  if (noMonitor) {
    cmd = `${solanaValidatorClient} --ledger ${LEDGER_PATH} exit --max-delinquent-stake ${maxDelinquentStake}`
  }
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
