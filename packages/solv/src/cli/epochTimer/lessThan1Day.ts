import { EpochData } from './epochTimer'
import writeEpochDataToFile from './writeEpochDataToFile'
import alertMessage from './alertMessage'
import { EpochInfoCLIType } from '@/lib/getEpochInfoByRust'
import { DefaultConfigType } from '@/config/types'

const isLessThan1Day = async (
  totalMinutes: number,
  epochData: EpochData,
  currentEpoch: EpochInfoCLIType,
  config: DefaultConfigType,
) => {
  if (
    totalMinutes < 24 * 60 &&
    totalMinutes >= 8 * 60 &&
    !epochData.isLessThan1Day
  ) {
    // Update the database and send a notification
    await writeEpochDataToFile({ ...epochData, isLessThan1Day: true })
    await alertMessage(currentEpoch, '1 Day', config)
  }
}

export default isLessThan1Day
