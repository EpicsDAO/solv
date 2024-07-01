import { EPOCH_TIMER_FILE_PATH } from '@/config/config'
import { writeFile } from 'fs/promises'
import { EpochData } from './epochTimer'

const writeEpochDataToFile = async (epochData: EpochData) => {
  await writeFile(
    EPOCH_TIMER_FILE_PATH,
    JSON.stringify({ ...epochData }, null, 2),
    'utf-8',
  )
}

export default writeEpochDataToFile
