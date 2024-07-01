import { EpochData } from './epochTimer'
import { EpochInfoType } from '@/lib/getEpochInfo'
import { sendDiscord } from '@/lib/sendDiscord'
import writeEpochDataToFile from './writeEpochDataToFile'

const newEpoch = async (currentEpoch: EpochInfoType) => {
  const params: EpochData = {
    epoch: currentEpoch.epoch,
    isLessThan1Hour: false,
    isLessThan8Hours: false,
    isLessThan1Day: false,
  }
  await writeEpochDataToFile(params)
  console.log('Epoch has been updated!')

  const content = `===⏳ ${currentEpoch.epoch} ⏳===
CurrentEpoch: ${currentEpoch.epoch}
Epoch has been updated!
Until Next Epoch: Approximately 2 days`
  await sendDiscord(content)
}

export default newEpoch
