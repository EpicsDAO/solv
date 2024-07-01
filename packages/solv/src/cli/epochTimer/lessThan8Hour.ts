import { EpochData } from './epochTimer'
import { EpochInfoType } from '@/lib/getEpochInfo'
import { sendDiscord } from '@/lib/sendDiscord'
import writeEpochDataToFile from './writeEpochDataToFile'

const lessThan8Hour = async (
  totalMinutes: number,
  epochData: EpochData,
  currentEpoch: EpochInfoType,
) => {
  if (
    totalMinutes < 8 * 60 &&
    totalMinutes >= 60 &&
    !epochData.isLessThan8Hours
  ) {
    // Update the database and send a notification
    await writeEpochDataToFile({ ...epochData, isLessThan8Hours: true })
    const content = `===⏳ ${currentEpoch.epoch} ⏳===
CurrentEpoch: ${currentEpoch.epoch}
Next epoch is coming in less than 8 hours!
Epoch Completed: ${currentEpoch.displayRatio}%
Until Next Epoch: ${currentEpoch.estimatedTimeUntilNextEpoch}`
    await sendDiscord(content)
  }
}

export default lessThan8Hour
