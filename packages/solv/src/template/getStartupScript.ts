import { SOLV_TYPES } from '@/config/config'
import { startTestnetValidatorScript } from '@/template/startupScripts/startTestnetValidatorScript'
import { startMainnetValidatorScript } from './startupScripts/startMainnetValidatorScript'
import { startRPCNodeScript } from './startupScripts/startRPCNodeScript'
import { startJitoValidatorScript } from './startupScripts/startJitoValidatorScript'
import { readOrCreateJitoConfig } from '@/lib/readOrCreateJitoConfig'

export const getStartupScript = (
  fetchSnapshot = false,
  solvTypes = SOLV_TYPES.TESTNET_VALIDATOR,
  isJitoMev = false,
) => {
  let script = ''
  if (isJitoMev) {
    const jitoConfig = readOrCreateJitoConfig()
    return startJitoValidatorScript(
      jitoConfig.commissionBps,
      jitoConfig.relayerUrl,
      jitoConfig.blockEngineUrl,
      jitoConfig.shredReceiverAddr,
    )
  }
  switch (solvTypes) {
    case SOLV_TYPES.TESTNET_VALIDATOR:
      script = startTestnetValidatorScript()
      break
    case SOLV_TYPES.MAINNET_VALIDATOR:
      script = startMainnetValidatorScript()
      break
    case SOLV_TYPES.RPC_NODE:
      script = startRPCNodeScript()
      break
    default:
      script = startTestnetValidatorScript()
      break
  }
  if (!fetchSnapshot) {
    return `${script}--no-snapshot-fetch \\\n--no-genesis-fetch`
  }
  return script
}
