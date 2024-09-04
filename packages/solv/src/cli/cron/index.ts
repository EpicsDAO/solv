import { program } from '@/index'
import { spawnSync } from 'node:child_process'
import chalk from 'chalk'
import hasEpochTimer from './hasEpochTimer'

type CronOptions = {
  cron: string
  epoch: string
}

export const cronCommands = () => {
  const crond = program.command('cron').description(`Cron Job Commands`)

  crond
    .command('epoch')
    .description('Solv Epoch Timer Discord Notification Command')
    .option('-c, --cron <value>', 'Cron Job', '*/5 * * * *')
    .action(async (options: CronOptions) => {
      const hasCron = await hasEpochTimer()
      if (hasCron) {
        console.log(chalk.green('⚠️ Epoch Timer Cron Job already set'))
        process.exit(1)
      }
      const cronJob = `(crontab -l 2>/dev/null; echo "${options.cron} . /home/solv/.profile && solv epochTimer >> /home/solv/cron.log 2>&1") | crontab -`
      spawnSync(cronJob, { shell: true, stdio: 'inherit' })
      console.log(chalk.green('✅ Epoch Timer Cron Job Set'))
    })
}
