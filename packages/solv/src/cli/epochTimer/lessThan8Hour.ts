import { EpochData } from './epochTimer'
import writeEpochDataToFile from './writeEpochDataToFile'
import alertMessage from './alertMessage'
import { EpochInfoCLIType } from '@/lib/getEpochInfoByRust'
import { DefaultConfigType } from '@/config/types'

const lessThan8Hour = async (
  totalMinutes: number,
  epochData: EpochData,
  currentEpoch: EpochInfoCLIType,
  config: DefaultConfigType,
) => {
  if (
    totalMinutes < 8 * 60 &&
    totalMinutes >= 60 &&
    !epochData.isLessThan8Hours
  ) {
    // Update the database and send a notification
    await writeEpochDataToFile({ ...epochData, isLessThan8Hours: true })
    await alertMessage(currentEpoch, '8 Hours', config)
  }
}

export default lessThan8Hour
