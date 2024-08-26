import { Connection } from '@solana/web3.js'

const getAverageSlotTime = async (
  rpcUrl: string,
  sampleCount = 10,
  fallbackSlotTime = 0.4, // Set a reasonable fallback slot time in seconds
): Promise<number> => {
  try {
    const connection = new Connection(rpcUrl)
    const samples = await connection.getRecentPerformanceSamples(sampleCount)

    // Handle the case where no samples are available
    if (samples.length === 0) {
      console.warn(
        'No performance samples available. Using fallback slot time.',
      )
      return fallbackSlotTime
    }

    // Filter out samples with numSlots equal to 0
    const validSamples = samples.filter((sample) => sample.numSlots !== 0)

    // If no valid samples, use the fallback slot time
    if (validSamples.length === 0) {
      console.warn(
        'All performance samples have numSlots equal to 0. Using fallback slot time.',
      )
      return fallbackSlotTime
    }

    // Calculate the average slot time from valid samples
    const averageSlotTime =
      validSamples.reduce((acc, sample) => {
        return acc + sample.samplePeriodSecs / sample.numSlots
      }, 0) / validSamples.length

    return averageSlotTime
  } catch (error) {
    console.error(
      `getAverageSlotTime failed: ${error}. Using fallback slot time.`,
    )
    return fallbackSlotTime // Return fallback slot time in case of error
  }
}

export default getAverageSlotTime
