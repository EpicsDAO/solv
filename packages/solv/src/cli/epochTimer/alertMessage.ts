import { getAllKeyPaths, NETWORK_TYPES } from '@/config/config'
import { EpochInfoCLIType } from '@/lib/getEpochInfoByRust'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { sendDiscord } from '@/lib/sendDiscord'

const alertMessage = async (
  currentEpoch: EpochInfoCLIType,
  lessThan: string,
  solvConfig: ConfigParams,
) => {
  const isTestnet = solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
  const { mainnetValidatorKey, testnetValidatorKey } = getAllKeyPaths()
  const address = isTestnet
    ? getSolanaAddress(testnetValidatorKey)
    : getSolanaAddress(mainnetValidatorKey)
  const content = `===⏳ ${currentEpoch.epoch} ⏳===
Validator: ${address}
Network: ${solvConfig.config.SOLANA_NETWORK}
CurrentEpoch: ${currentEpoch.epoch}
Next epoch is coming in less than ${lessThan}!
Epoch Completed: ${currentEpoch.epochCompletedPercent}%
Until Next Epoch: ${currentEpoch.epochRemainingTime}`
  await sendDiscord(content)
}

export default alertMessage
