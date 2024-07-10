import { getAllKeyPaths, NETWORK_TYPES } from '@/config/config'
import { EpochInfoType } from '@/lib/getEpochInfo'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { sendDiscord } from '@/lib/sendDiscord'

const alertMessage = async (
  currentEpoch: EpochInfoType,
  lessThan: string,
  solvConfig: ConfigParams,
) => {
  const displayRatio = (
    (currentEpoch.slotIndex / currentEpoch.slotsInEpoch) *
    100
  ).toFixed(2)
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
Epoch Completed: ${displayRatio}%
Until Next Epoch: ${currentEpoch.estimatedTimeUntilNextEpoch}`
  await sendDiscord(content)
}

export default alertMessage
