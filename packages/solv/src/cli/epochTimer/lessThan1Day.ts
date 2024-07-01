import { EpochData } from './epochTimer'
import { EpochInfoType } from '@/lib/getEpochInfo'
import { sendDiscord } from '@/lib/sendDiscord'
import writeEpochDataToFile from './writeEpochDataToFile'

const isLessThan1Day = async (
  totalMinutes: number,
  epochData: EpochData,
  currentEpoch: EpochInfoType,
) => {
  if (
    totalMinutes < 24 * 60 &&
    totalMinutes >= 8 * 60 &&
    !epochData.isLessThan1Day
  ) {
    // Update the database and send a notification
    await writeEpochDataToFile({ ...epochData, isLessThan1Day: true })
    const content = `===⏳ ${currentEpoch.epoch} ⏳===
CurrentEpoch: ${currentEpoch.epoch}
Next epoch is coming in less than 1 day!
Epoch Completed: ${currentEpoch.displayRatio}%
Until Next Epoch: ${currentEpoch.estimatedTimeUntilNextEpoch}`
    await sendDiscord(content)
  }
}

export default isLessThan1Day
