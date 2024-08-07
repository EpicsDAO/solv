import { EpochData } from './epochTimer'
import { EpochInfoType } from '@/lib/getEpochInfo'
import writeEpochDataToFile from './writeEpochDataToFile'
import alertMessage from './alertMessage'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'

const isLessThan1Day = async (
  totalMinutes: number,
  epochData: EpochData,
  currentEpoch: EpochInfoType,
  solvConfig: ConfigParams,
) => {
  if (
    totalMinutes < 24 * 60 &&
    totalMinutes >= 8 * 60 &&
    !epochData.isLessThan1Day
  ) {
    // Update the database and send a notification
    await writeEpochDataToFile({ ...epochData, isLessThan1Day: true })
    await alertMessage(currentEpoch, '1 Day', solvConfig)
  }
}

export default isLessThan1Day
