import { EPOCH_TIMER_FILE_PATH } from '@/config/config'
import { existsAsync } from '@skeet-framework/utils'
import { EpochData } from './epochTimer'
import { readFile, writeFile } from 'fs/promises'
import chalk from 'chalk'
import { homedir } from 'os'

const initOrReadEpochFile = async () => {
  const homeDir = homedir()
  const epochFilePath = homeDir.includes('/home/solv')
    ? EPOCH_TIMER_FILE_PATH
    : `./currentEpoch.json`
  if (await existsAsync(epochFilePath)) {
    return JSON.parse(await readFile(epochFilePath, 'utf-8')) as EpochData
  }
  const initialData: EpochData = {
    epoch: 0,
    isLessThan1Hour: false,
    isLessThan8Hours: false,
    isLessThan1Day: false,
  }
  await writeFile(epochFilePath, JSON.stringify(initialData, null, 2), 'utf-8')
  console.log(chalk.white('✔️ Initial epoch data has been created!'))
  return initialData
}

export default initOrReadEpochFile
