import { getAllKeyPaths } from '@/config/config'
import { Network } from '@/config/enums'
import { DefaultConfigType } from '@/config/types'
import { EpochInfoCLIType } from '@/lib/getEpochInfoByRust'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import { sendDiscord } from '@/lib/sendDiscord'

const alertMessage = async (
  currentEpoch: EpochInfoCLIType,
  lessThan: string,
  config: DefaultConfigType,
) => {
  const isTestnet = config.NETWORK === Network.TESTNET
  const { mainnetValidatorKey, testnetValidatorKey } = getAllKeyPaths()
  const address = isTestnet
    ? getSolanaAddress(testnetValidatorKey)
    : getSolanaAddress(mainnetValidatorKey)
  const content = `===⏳ ${currentEpoch.epoch} ⏳===
Validator: ${address}
Network: ${config.NETWORK}
CurrentEpoch: ${currentEpoch.epoch}
Next epoch is coming in less than ${lessThan}!
Epoch Completed: ${currentEpoch.epochCompletedPercent}%
Until Next Epoch: ${currentEpoch.epochRemainingTime}`
  await sendDiscord(content)
}

export default alertMessage
