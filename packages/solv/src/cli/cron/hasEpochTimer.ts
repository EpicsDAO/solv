import { readFile } from 'fs/promises'

const hasEpochTimer = async () => {
  try {
    const crontabList = await readFile('/etc/crontab', 'utf-8')
    return crontabList.includes('solv epochTimer')
  } catch (error) {
    return false
  }
}

export default hasEpochTimer
