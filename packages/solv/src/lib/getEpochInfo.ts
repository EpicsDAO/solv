import { Connection, EpochInfo } from '@solana/web3.js'
import getAverageSlotTime from './getAverageSlotTime'

export interface EpochInfoType extends EpochInfo {
  estimatedTimeUntilNextEpoch: string
  displayRatio: string
}

export const getEpochInfo = async (rpcUrl: string) => {
  try {
    const connection = new Connection(rpcUrl)
    const epochInfo = await connection.getEpochInfo()
    const timePerSlotSeconds = await getAverageSlotTime(rpcUrl)
    const remainingSlots = epochInfo.slotsInEpoch - epochInfo.slotIndex
    const estimatedSecondsUntilNextEpoch = remainingSlots * timePerSlotSeconds
    const displayRatio = (
      (epochInfo.slotIndex / epochInfo.slotsInEpoch) *
      100
    ).toFixed(2)
    // 時間の表示方法を調整
    const days = Math.floor(estimatedSecondsUntilNextEpoch / (3600 * 24))
    const hours = Math.floor(
      (estimatedSecondsUntilNextEpoch % (3600 * 24)) / 3600,
    )
    const minutes = Math.floor((estimatedSecondsUntilNextEpoch % 3600) / 60)
    const seconds = Math.floor(estimatedSecondsUntilNextEpoch % 60)
    let estimatedTimeUntilNextEpoch = `${days}d ${hours}h ${minutes}m ${seconds}s`
    if (days === 0) {
      estimatedTimeUntilNextEpoch = `${hours}h ${minutes}m ${seconds}s`
    }
    return {
      ...epochInfo,
      estimatedTimeUntilNextEpoch,
      displayRatio,
    } as EpochInfoType
  } catch (error) {
    throw new Error(`getEpochInfo failed: ${error}`)
  }
}
