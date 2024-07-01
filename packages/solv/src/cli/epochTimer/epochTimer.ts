import { format } from '@skeet-framework/utils'
import { getEpochInfo } from '@/lib/getEpochInfo'
import getTotalMinutes from '@/lib/getTotalMinutes'
import isLessThan1Day from './lessThan1Day'
import lessThan8Hour from './lessThan8Hour'
import lessThan1Hour from './lessThan1Hour'
import newEpoch from './newEpoch'
import initOrReadEpochFile from './initEpochFile'
import checkBalance from './checkBalance'

export type EpochData = {
  epoch: number
  isLessThan1Hour: boolean
  isLessThan8Hours: boolean
  isLessThan1Day: boolean
}

export const epochTimer = async (rpcUrl: string, isMEV = false) => {
  const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  console.log(`Checking Epoch at ${now}`)
  const getD1Epoch = await initOrReadEpochFile()
  const currentEpoch = await getEpochInfo(rpcUrl)

  // Check Validator Account's Balance
  await checkBalance()

  // New epoch has been updated
  if (getD1Epoch.epoch < currentEpoch.epoch) {
    await newEpoch(currentEpoch)
    return 'Epoch has been updated!'
  }

  // Get the total minutes until the next epoch
  const totalMinutes = getTotalMinutes(currentEpoch.estimatedTimeUntilNextEpoch)

  // Check if the epoch is less than 1 hour, 8 hours, and 1 day
  await lessThan1Hour(totalMinutes, getD1Epoch, currentEpoch, isMEV)
  await lessThan8Hour(totalMinutes, getD1Epoch, currentEpoch)
  await isLessThan1Day(totalMinutes, getD1Epoch, currentEpoch)

  return 'Epoch has not been changed!'
}

export default epochTimer
