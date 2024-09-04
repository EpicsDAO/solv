import {
  AGAVE_VALIDATOR,
  LEDGER_PATH,
  SOLANA_VALIDATOR,
} from '@/config/constants'
import { Network, NodeType } from '@/config/enums'
import { DefaultConfigType } from '@/config/types'
import { spawnSync } from 'node:child_process'

export const monitorSolana = (config: DefaultConfigType) => {
  const isTestnet = config.NETWORK === Network.TESTNET
  const isRPC = config.NODE_TYPE === NodeType.RPC
  let solanaValidatorClient = isTestnet ? AGAVE_VALIDATOR : SOLANA_VALIDATOR
  if (isRPC) {
    solanaValidatorClient = AGAVE_VALIDATOR
  }
  const cmd = `${solanaValidatorClient} --ledger ${LEDGER_PATH} monitor`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
