import { SOLV_TYPES } from '@/config/config'
import { startTestnetAgaveValidatorScript } from '@/template/startupScripts/startTestnetAgaveValidatorScript'
import { startMainnetValidatorScript } from './startupScripts/startMainnetValidatorScript'
import { startRPCNodeScript } from './startupScripts/startRPCNodeScript'
import { startJitoValidatorScript } from './startupScripts/startJitoValidatorScript'
import { readOrCreateJitoConfig } from '@/lib/readOrCreateJitoConfig'
import { startJitoRelayerValidatorScript } from './startupScripts/startJitoRelayerValidatorScript'
import { startJitoRPCScript } from './startupScripts/startJitoRPCScript'

export const getStartupScript = async (
  fetchSnapshot = false,
  solvTypes = SOLV_TYPES.TESTNET_VALIDATOR,
  isJitoMev = false,
  hasRelayer = false,
  isJitoRPC = false,
) => {
  let script = ''
  if (isJitoMev) {
    const jitoConfig = await readOrCreateJitoConfig()
    if (isJitoRPC) {
      return startJitoRPCScript(
        jitoConfig.commissionBps,
        jitoConfig.relayerUrl,
        jitoConfig.blockEngineUrl,
        jitoConfig.shredReceiverAddr,
      )
    }

    if (hasRelayer) {
      return startJitoRelayerValidatorScript(
        jitoConfig.commissionBps,
        jitoConfig.blockEngineUrl,
        jitoConfig.shredReceiverAddr,
      )
    }

    return startJitoValidatorScript(
      jitoConfig.commissionBps,
      jitoConfig.relayerUrl,
      jitoConfig.blockEngineUrl,
      jitoConfig.shredReceiverAddr,
    )
  }
  switch (solvTypes) {
    case SOLV_TYPES.TESTNET_VALIDATOR:
      script = startTestnetAgaveValidatorScript()
      break
    case SOLV_TYPES.MAINNET_VALIDATOR:
      script = startMainnetValidatorScript()
      break
    case SOLV_TYPES.RPC_NODE:
      script = startRPCNodeScript()
      break
    default:
      script = startTestnetAgaveValidatorScript()
      break
  }
  if (!fetchSnapshot) {
    return `${script}--use-snapshot-archives-at-startup when-newest \\\n--no-genesis-fetch`
  }
  return script
}
