import { Connection } from '@solana/web3.js'

const getAverageSlotTime = async (
  rpcUrl: string,
  sampleCount = 10,
): Promise<number> => {
  const connection = new Connection(rpcUrl)
  const samples = await connection.getRecentPerformanceSamples(sampleCount)

  // サンプルが存在しない場合のハンドリング
  if (samples.length === 0) {
    throw new Error('No performance samples available.')
  }

  const averageSlotTime =
    samples.reduce((acc, sample) => {
      // numSlotsが0でないことを確認
      if (sample.numSlots === 0) {
        throw new Error(
          'Sample has numSlots equal to 0, causing division by zero.',
        )
      }

      return acc + sample.samplePeriodSecs / sample.numSlots
    }, 0) / samples.length

  return averageSlotTime
}

export default getAverageSlotTime
