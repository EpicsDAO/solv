import { EpochData } from './epochTimer'
import { EpochInfoType } from '@/lib/getEpochInfo'
import writeEpochDataToFile from './writeEpochDataToFile'
import alertMessage from './alertMessage'

const isLessThan1Day = async (
  totalMinutes: number,
  epochData: EpochData,
  currentEpoch: EpochInfoType,
  isMEV: boolean = false,
) => {
  if (
    totalMinutes < 24 * 60 &&
    totalMinutes >= 8 * 60 &&
    !epochData.isLessThan1Day
  ) {
    // Update the database and send a notification
    await writeEpochDataToFile({ ...epochData, isLessThan1Day: true })
    await alertMessage(currentEpoch, '1 Day')
  }
}

export default isLessThan1Day
