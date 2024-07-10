import { format } from '@skeet-framework/utils'
import { getEpochInfo } from '@/lib/getEpochInfo'
import getTotalMinutes from '@/lib/getTotalMinutes'
import isLessThan1Day from './lessThan1Day'
import lessThan8Hour from './lessThan8Hour'
import lessThan1Hour from './lessThan1Hour'
import newEpoch from './newEpoch'
import initOrReadEpochFile from './initEpochFile'
import checkBalance from './checkBalance'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { isValidatorActive } from './isValidatorActive'
import {
  getAllKeyPaths,
  NETWORK_TYPES,
  SOLANA_TESTNET_RPC_URL,
} from '@/config/config'
import { sendDiscord } from '@/lib/sendDiscord'
import isVersionSame from './isVersionSame'
import { spawnSync } from 'child_process'
import { getSolanaAddress } from '@/lib/getSolanaAddress'

export type EpochData = {
  epoch: number
  isLessThan1Hour: boolean
  isLessThan8Hours: boolean
  isLessThan1Day: boolean
}

export const epochTimer = async (solvConfig: ConfigParams) => {
  const isTestnet = solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
  const rpcUrl = isTestnet ? SOLANA_TESTNET_RPC_URL : solvConfig.config.RPC_URL
  const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  console.log(`Checking Epoch at ${now}`)
  const getD1Epoch = await initOrReadEpochFile()
  const currentEpoch = await getEpochInfo(rpcUrl)

  // Check Validator Account's Balance
  await checkBalance(solvConfig)

  // Check if solv/Solana version update is required
  const isSolvVersionSame = await isVersionSame()
  if (!isSolvVersionSame && solvConfig.config.AUTO_UPDATE) {
    console.log(`Found new version of solv! Updating...`)
    spawnSync(`solv update && solv update --auto`, {
      stdio: 'inherit',
      shell: true,
    })
  }

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
      `⚠️ Validator is not active!\nVoteAccount: ${isActive.pubkey}\nReason: ${isActive.reason}\nNetwork: ${solvConfig.config.SOLANA_NETWORK}\nPlease check your validator node 👷‍♀️`,
    )
  }
  console.log(`Validator is active: ${isActive.isActive}`)

  // New epoch has been updated
  if (getD1Epoch.epoch < currentEpoch.epoch) {
    await newEpoch(currentEpoch, solvConfig)
    return 'Epoch has been updated!'
  }

  // Get the total minutes until the next epoch
  const totalMinutes = getTotalMinutes(currentEpoch.estimatedTimeUntilNextEpoch)

  // Check conditions in sequence and stop if any condition is met
  const checks = [lessThan1Hour, lessThan8Hour, isLessThan1Day]
  for (const check of checks) {
    const result = await check(
      totalMinutes,
      getD1Epoch,
      currentEpoch,
      solvConfig,
    )
    if (result) {
      break
    }
  }

  return 'Epoch has not been changed!'
}

export default epochTimer
