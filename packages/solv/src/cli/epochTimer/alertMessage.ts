import { EpochInfoType } from '@/lib/getEpochInfo'
import { sendDiscord } from '@/lib/sendDiscord'

const alertMessage = async (currentEpoch: EpochInfoType, lessThan: string) => {
  const displayRatio = (
    (currentEpoch.slotIndex / currentEpoch.slotsInEpoch) *
    100
  ).toFixed(2)
  const content = `===⏳ ${currentEpoch.epoch} ⏳===
  CurrentEpoch: ${currentEpoch.epoch}
  Next epoch is coming in less than ${lessThan}!
  Epoch Completed: ${displayRatio}%
  Until Next Epoch: ${currentEpoch.estimatedTimeUntilNextEpoch}`
  await sendDiscord(content)
}

export default alertMessage
