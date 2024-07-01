import { EPOCH_TIMER_FILE_PATH } from '@/config/config'
import { writeFile } from 'fs/promises'
import { EpochData } from './epochTimer'
import { EpochInfoType } from '@/lib/getEpochInfo'
import { sendDiscord } from '@/lib/sendDiscord'
import { spawnSync } from 'child_process'

const lessThan1Hour = async (
  totalMinutes: number,
  epochData: EpochData,
  currentEpoch: EpochInfoType,
  isMEV: boolean = false,
) => {
  if (totalMinutes < 60 && !epochData.isLessThan1Hour) {
    // Update the database and send a notification
    await writeFile(
      EPOCH_TIMER_FILE_PATH,
      JSON.stringify({ ...epochData, isLessThan1Hours: true }, null, 2),
      'utf-8',
    )
    const content = `===⏳ ${currentEpoch.epoch} ⏳===
CurrentEpoch: ${currentEpoch.epoch}
Next epoch is coming in less than 1 hours!
Epoch Completed: ${currentEpoch.displayRatio}%
Until Next Epoch: ${currentEpoch.estimatedTimeUntilNextEpoch}`
    await sendDiscord(content)

    // If MEV is enabled, run `solv harvest` command
    if (isMEV) {
      // run `solv harvest` command
      spawnSync('solv', ['harvest'], { stdio: 'inherit', shell: true })
    }
    return true
  }
  return false
}

export default lessThan1Hour
