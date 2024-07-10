import { spawnSync } from 'child_process'
import chalk from 'chalk'
import { promises as fs } from 'fs'

const removeCronJob = async (cronPattern = 'epochTimer'): Promise<void> => {
  try {
    // 現在のcrontabの内容を取得
    const crontabResult = spawnSync('crontab', ['-l'], { encoding: 'utf-8' })
    if (crontabResult.status !== 0) {
      console.log(chalk.red('⚠️ Could not read crontab.'))
      process.exit(1)
    }

    const crontab = crontabResult.stdout.split('\n')

    // 指定したcronPatternを含まない行だけを抽出
    const newCronBody = crontab
      .filter((line) => !line.includes(cronPattern))
      .join('\n')

    // 新しいcrontabの内容を設定
    const tempCrontabFile = '/tmp/temp_crontab'
    await fs.writeFile(tempCrontabFile, newCronBody, 'utf-8')
    spawnSync('crontab', [tempCrontabFile])
    await fs.unlink(tempCrontabFile) // 一時ファイルを削除

    console.log(chalk.green('✅ Cron Job successfully removed.'))
  } catch (error) {
    console.log(chalk.red('Error removing cron job:', error))
  }
}

export default removeCronJob
