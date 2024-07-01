import { EPOCH_TIMER_FILE_PATH } from '@/config/config'
import { existsAsync } from '@skeet-framework/utils'
import { EpochData } from './epochTimer'
import { readFile, writeFile } from 'fs/promises'
import chalk from 'chalk'

const initOrReadEpochFile = async () => {
  if (await existsAsync(EPOCH_TIMER_FILE_PATH)) {
    return JSON.parse(
      await readFile(EPOCH_TIMER_FILE_PATH, 'utf-8'),
    ) as EpochData
  }
  const initialData: EpochData = {
    epoch: 0,
    isLessThan1Hour: false,
    isLessThan8Hours: false,
    isLessThan1Day: false,
  }
  await writeFile(
    EPOCH_TIMER_FILE_PATH,
    JSON.stringify(initialData, null, 2),
    'utf-8',
  )
  console.log(chalk.white('✔️ Initial epoch data has been created!'))
  return initialData
}

export default initOrReadEpochFile
