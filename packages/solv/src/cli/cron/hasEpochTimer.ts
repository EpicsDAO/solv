import { spawnSync } from 'child_process'

const hasEpochTimer = async (): Promise<boolean> => {
  try {
    const result = spawnSync('crontab', ['-l'], { encoding: 'utf-8' })
    if (result.status !== 0) {
      console.log('No crontab for this user.')
      return false
    }

    const crontabList = result.stdout
    console.log(crontabList)
    return crontabList.includes('solv epochTimer')
  } catch (error) {
    console.error('Error reading crontab:', error)
    return false
  }
}

export default hasEpochTimer
