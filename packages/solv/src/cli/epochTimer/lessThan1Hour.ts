import { EpochData } from './epochTimer'
import { spawnSync } from 'child_process'
import writeEpochDataToFile from './writeEpochDataToFile'
import alertMessage from './alertMessage'
import chalk from 'chalk'
import randomSleep from './randomSleep'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { NETWORK_TYPES } from '@/config/config'
import { EpochInfoCLIType } from '@/lib/getEpochInfoByRust'

const lessThan1Hour = async (
  totalMinutes: number,
  epochData: EpochData,
  currentEpoch: EpochInfoCLIType,
  solvConfig: ConfigParams,
) => {
  const isMEV = solvConfig.config.IS_MEV_MODE
  const isMainnet = solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.MAINNET
  if (totalMinutes < 60 && !epochData.isLessThan1Hour) {
    // Update the database and send a notification
    await writeEpochDataToFile({ ...epochData, isLessThan1Hour: true })
    await alertMessage(currentEpoch, '1 Hour', solvConfig)

    // If MEV is enabled, run `solv harvest` command
    if (isMEV && isMainnet) {
      // Random Sleep to avoid network congestion
      const waitTime = await randomSleep(1, 100)
      console.log(
        chalk.white(
          `⏳ Waiting for ${waitTime} seconds before running solv harvest...`,
        ),
      )
      // run `solv harvest` command
      spawnSync('solv', ['harvest'], { stdio: 'inherit', shell: true })
    }
    return true
  }
  return false
}

export default lessThan1Hour
