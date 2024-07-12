import { NETWORK_TYPES } from '@/config/config'
import {
  AGAVE_VALIDATOR,
  LEDGER_PATH,
  SOLANA_VALIDATOR,
} from '@/config/constants'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { spawnSync } from 'child_process'

export const monitorSolana = (solvConfig: ConfigParams) => {
  const isTestnet = solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
  const solanaValidatorClient = isTestnet ? AGAVE_VALIDATOR : SOLANA_VALIDATOR
  const cmd = `${solanaValidatorClient} --ledger ${LEDGER_PATH} monitor`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
