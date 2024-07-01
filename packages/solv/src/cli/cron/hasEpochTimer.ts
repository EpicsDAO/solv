import { readFile } from 'fs/promises'

const hasEpochTimer = async () => {
  const crontabList = await readFile('/etc/crontab', 'utf-8')
  return crontabList.includes('solv epochTimer')
}

export default hasEpochTimer
