import { spawnSync } from 'child_process'
import chalk from 'chalk'
import { promises as fs } from 'fs'

const removeCronJob = async (cronPattern = '*/5 * * * *'): Promise<void> => {
  try {
    // 現在のcrontabの内容を取得
    const crontabResult = spawnSync('crontab', ['-l'], { encoding: 'utf-8' })
    if (crontabResult.status !== 0) {
      console.log(chalk.red('⚠️ Could not read crontab.'))
      process.exit(1)
    }

    const crontab = crontabResult.stdout.split('\n')

    // 削除するcronジョブのパターン
    const cronJobPattern = new RegExp(
      `^${cronPattern.replace(/\*/g, '\\*')} .*solv epochTimer.*$`,
    )

    // 指定された行を削除
    const updatedCrontab = crontab
      .filter((line) => !cronJobPattern.test(line))
      .join('\n')

    // 新しいcrontabの内容を設定
    const tempCrontabFile = '/tmp/temp_crontab'
    await fs.writeFile(tempCrontabFile, updatedCrontab, 'utf-8')
    spawnSync('crontab', [tempCrontabFile])
    await fs.unlink(tempCrontabFile) // 一時ファイルを削除

    console.log(chalk.green('✅ Cron Job successfully removed.'))
  } catch (error) {
    console.log(chalk.red('Error removing cron job:', error))
  }
}

export default removeCronJob
