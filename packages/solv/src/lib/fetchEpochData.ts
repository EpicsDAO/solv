import { readFile, writeFile } from 'fs/promises'
import { getEpochInfo } from './getEpochInfo'
import getTotalMinutes from './getTotalMinutes'
import { existsAsync, sendDiscord } from '@skeet-framework/utils'

export type EpochData = {
  epoch: number
  isLessThan1Hour: boolean
  isLessThan8Hours: boolean
  isLessThan1Day: boolean
}

const FILE_PATH = 'currentEpoch.json'

export const epochTimer = async (rpcUrl: string, webhookUrl: string) => {
  if (!(await existsAsync(FILE_PATH))) {
    const initialData: EpochData = {
      epoch: 0,
      isLessThan1Hour: false,
      isLessThan8Hours: false,
      isLessThan1Day: false,
    }
    await writeFile(FILE_PATH, JSON.stringify(initialData, null, 2), 'utf-8')
    console.log('Initial epoch data has been created!')
  }
  const jsonFile = await readFile(FILE_PATH, 'utf-8')
  const getD1Epoch = JSON.parse(jsonFile) as EpochData
  const currentEpoch = await getEpochInfo(rpcUrl)
  const displayRatio = (
    (currentEpoch.slotIndex / currentEpoch.slotsInEpoch) *
    100
  ).toFixed(2)

  if (getD1Epoch.epoch < currentEpoch.epoch) {
    const params: EpochData = {
      epoch: currentEpoch.epoch,
      isLessThan1Hour: false,
      isLessThan8Hours: false,
      isLessThan1Day: false,
    }
    await writeFile(FILE_PATH, JSON.stringify(params, null, 2), 'utf-8')
    console.log('Epoch has been updated!')
    return 'Epoch has been updated!'
  }

  const totalMinutes = getTotalMinutes(currentEpoch.estimatedTimeUntilNextEpoch)
  // Check if the epoch is less than 1 hour
  if (totalMinutes < 60 && !getD1Epoch.isLessThan1Hour) {
    // Update the database and send a notification
    await writeFile(
      FILE_PATH,
      JSON.stringify({ ...getD1Epoch, isLessThan1Hour: true }, null, 2),
      'utf-8',
    )
    const content = `===⏳ ${currentEpoch.epoch} ⏳===
CurrentEpoch: ${currentEpoch.epoch}
Next epoch is coming in less than 1 hour!
Epoch Completed: ${displayRatio}%
Until Next Epoch: ${currentEpoch.estimatedTimeUntilNextEpoch}`
    await sendDiscord(content, {
      webhookUrl,
    })
  }

  // Check if the epoch is less than 8 hours
  if (
    totalMinutes < 8 * 60 &&
    totalMinutes >= 60 &&
    !getD1Epoch.isLessThan8Hours
  ) {
    // Update the database and send a notification
    await writeFile(
      FILE_PATH,
      JSON.stringify({ ...getD1Epoch, isLessThan8Hours: true }, null, 2),
      'utf-8',
    )
    const content = `===⏳ ${currentEpoch.epoch} ⏳===
CurrentEpoch: ${currentEpoch.epoch}
Next epoch is coming in less than 8 hours!
Epoch Completed: ${displayRatio}%
Until Next Epoch: ${currentEpoch.estimatedTimeUntilNextEpoch}`
    await sendDiscord(content, {
      webhookUrl,
    })
  }

  // Check if the epoch is less than 1 day
  if (
    totalMinutes < 24 * 60 &&
    totalMinutes >= 8 * 60 &&
    !getD1Epoch.isLessThan1Day
  ) {
    // Update the database and send a notification
    await writeFile(
      FILE_PATH,
      JSON.stringify({ ...getD1Epoch, isLessThan1Day: true }, null, 2),
      'utf-8',
    )
    const content = `===⏳ ${currentEpoch.epoch} ⏳===
CurrentEpoch: ${currentEpoch.epoch}
Next epoch is coming in less than 1 day!
Epoch Completed: ${displayRatio}%
Until Next Epoch: ${currentEpoch.estimatedTimeUntilNextEpoch}`
    await sendDiscord(content, {
      webhookUrl,
    })
  }

  return 'Epoch has not been changed!'
}

export default epochTimer
