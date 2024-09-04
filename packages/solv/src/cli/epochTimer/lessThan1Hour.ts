import { EpochData } from './epochTimer'
import { spawnSync } from 'child_process'
import writeEpochDataToFile from './writeEpochDataToFile'
import alertMessage from './alertMessage'
import chalk from 'chalk'
import randomSleep from './randomSleep'
import { EpochInfoCLIType } from '@/lib/getEpochInfoByRust'
import { DefaultConfigType } from '@/config/types'
import { Network } from '@/config/enums'

const lessThan1Hour = async (
  totalMinutes: number,
  epochData: EpochData,
  currentEpoch: EpochInfoCLIType,
  config: DefaultConfigType,
) => {
  const isMEV = config.IS_MEV_MODE
  const isMainnet = config.NETWORK === Network.MAINNET
  if (totalMinutes < 60 && !epochData.isLessThan1Hour) {
    // Update the database and send a notification
    await writeEpochDataToFile({ ...epochData, isLessThan1Hour: true })
    await alertMessage(currentEpoch, '1 Hour', config)

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
