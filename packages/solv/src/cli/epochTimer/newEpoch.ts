import { EpochData } from './epochTimer'
import { sendDiscord } from '@/lib/sendDiscord'
import writeEpochDataToFile from './writeEpochDataToFile'
import { getAllKeyPaths } from '@/config/config'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import { EpochInfoCLIType } from '@/lib/getEpochInfoByRust'
import { DefaultConfigType } from '@/config/types'
import { Network } from '@/config/enums'
import { spawnSync } from 'node:child_process'

const newEpoch = async (
  currentEpoch: EpochInfoCLIType,
  config: DefaultConfigType,
) => {
  const isTestnet = config.NETWORK === Network.TESTNET
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

  // Temporary code to stop the node
  // Check if the current epoch is 700
  // Hault the Node if the epoch is 700
  if (isTestnet && currentEpoch.epoch === 700) {
    // Stop the node
    spawnSync(`solv stop`, {
      stdio: 'inherit',
      shell: true,
    })
    await sendDiscord(`🚨 Epoch 700 has been reached! Stopping the node...`)
  }

  const content = `===⏳ ${currentEpoch.epoch} ⏳===
Validator: ${address}
Network: ${config.NETWORK}
CurrentEpoch: ${currentEpoch.epoch}
Epoch has been updated!
Until Next Epoch: Approximately 2 days`
  await sendDiscord(content)
  return 'Epoch has been updated!'
}

export default newEpoch
