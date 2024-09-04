import { format } from '@skeet-framework/utils'
import isLessThan1Day from './lessThan1Day'
import lessThan8Hour from './lessThan8Hour'
import lessThan1Hour from './lessThan1Hour'
import newEpoch from './newEpoch'
import initOrReadEpochFile from './initEpochFile'
import checkBalance from './checkBalance'
import { isValidatorActive } from './isValidatorActive'
import { getAllKeyPaths, SOLANA_TESTNET_RPC_URL } from '@/config/config'
import { sendDiscord } from '@/lib/sendDiscord'
import isVersionSame from './isVersionSame'
import { spawnSync } from 'child_process'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import { getEpochInfoByRust } from '@/lib/getEpochInfoByRust'
import { DefaultConfigType } from '@/config/types'
import { Network } from '@/config/enums'

export type EpochData = {
  epoch: number
  isLessThan1Hour: boolean
  isLessThan8Hours: boolean
  isLessThan1Day: boolean
}

export const epochTimer = async (config: DefaultConfigType) => {
  const isTestnet = config.NETWORK === Network.TESTNET
  const rpcUrl = isTestnet ? SOLANA_TESTNET_RPC_URL : config.RPC_URL
  const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  console.log(`Checking Epoch at ${now}`)
  const getD1Epoch = await initOrReadEpochFile()
  const currentEpoch = getEpochInfoByRust(rpcUrl)
  // Check Validator Account's Balance
  await checkBalance(config)

  // Check if Validator is running
  const { mainnetValidatorVoteKey, testnetValidatorVoteKey } = getAllKeyPaths()
  let voteAccountKey = isTestnet
    ? testnetValidatorVoteKey
    : mainnetValidatorVoteKey
  const isActive = await isValidatorActive(
    rpcUrl,
    getSolanaAddress(voteAccountKey),
  )
  if (!isActive.isActive) {
    await sendDiscord(
      `⚠️ Validator is not active!\nVoteAccount: ${isActive.pubkey}\nReason: ${isActive.reason}\nNetwork: ${config.NETWORK}\nPlease check your validator node 👷‍♀️`,
    )
  }
  console.log(`Validator is active: ${isActive.isActive}`)

  // Check if solv/Solana version update is required
  const isSolvVersionSame = await isVersionSame()
  if (!isSolvVersionSame && config.AUTO_UPDATE) {
    console.log(`Found new version of solv! Updating...`)
    spawnSync(`solv update && solv update --auto`, {
      stdio: 'inherit',
      shell: true,
    })
    return 'Node has been restarted!'
  }

  // New epoch has been updated
  if (getD1Epoch.epoch < currentEpoch.epoch) {
    await newEpoch(currentEpoch, config)
    return 'Epoch has been updated!'
  }

  // Get the total minutes until the next epoch
  const totalMinutes = currentEpoch.totalMinutes

  // Check conditions in sequence and stop if any condition is met
  const checks = [lessThan1Hour, lessThan8Hour, isLessThan1Day]
  for (const check of checks) {
    const result = await check(totalMinutes, getD1Epoch, currentEpoch, config)
    if (result) {
      break
    }
  }

  return 'Epoch has not been changed!'
}

export default epochTimer
