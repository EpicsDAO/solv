import { EpochData } from './epochTimer'
import { EpochInfoType } from '@/lib/getEpochInfo'
import { sendDiscord } from '@/lib/sendDiscord'
import writeEpochDataToFile from './writeEpochDataToFile'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { getAllKeyPaths, NETWORK_TYPES } from '@/config/config'
import { getSolanaAddress } from '@/lib/getSolanaAddress'

const newEpoch = async (
  currentEpoch: EpochInfoType,
  solvConfig: ConfigParams,
) => {
  const isTestnet = solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
  const params: EpochData = {
    epoch: currentEpoch.epoch,
    isLessThan1Hour: false,
    isLessThan8Hours: false,
    isLessThan1Day: false,
  }
  const { mainnetValidatorKey, testnetValidatorKey } = getAllKeyPaths()
  const address = isTestnet
    ? getSolanaAddress(testnetValidatorKey)
    : getSolanaAddress(mainnetValidatorKey)
  await writeEpochDataToFile(params)
  console.log('Epoch has been updated!')

  const content = `===⏳ ${currentEpoch.epoch} ⏳===
Validator: ${address}
Network: ${solvConfig.config.SOLANA_NETWORK}
CurrentEpoch: ${currentEpoch.epoch}
Epoch has been updated!
Until Next Epoch: Approximately 2 days`
  await sendDiscord(content)
}

export default newEpoch
