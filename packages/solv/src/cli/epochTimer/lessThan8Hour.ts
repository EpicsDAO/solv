import { EpochData } from './epochTimer'
import writeEpochDataToFile from './writeEpochDataToFile'
import alertMessage from './alertMessage'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { EpochInfoCLIType } from '@/lib/getEpochInfoByRust'

const lessThan8Hour = async (
  totalMinutes: number,
  epochData: EpochData,
  currentEpoch: EpochInfoCLIType,
  solvConfig: ConfigParams,
) => {
  if (
    totalMinutes < 8 * 60 &&
    totalMinutes >= 60 &&
    !epochData.isLessThan8Hours
  ) {
    // Update the database and send a notification
    await writeEpochDataToFile({ ...epochData, isLessThan8Hours: true })
    await alertMessage(currentEpoch, '8 Hours', solvConfig)
  }
}

export default lessThan8Hour
