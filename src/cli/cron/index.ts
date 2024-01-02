import { program } from '@/index'
import cron from 'node-cron'
import { getEpochRemote } from './getEpoch'
import { Logger } from '@/lib/logger'
import { spawnSync } from 'child_process'
import { stopSolana } from '../stop/stopSolana'
import { dotenv, sendDiscord } from '@skeet-framework/utils'
import chalk from 'chalk'
dotenv.config()

type CronOptions = {
  cron: string
  epoch: string
}

export const cronCommands = async () => {
  const crond = program.command('cron').description('Cron Task Command')

  crond
    .command('watchHalt')
    .description(
      'Solv Discord Notification Command. Please set `.env` file with  `DISCORD_WEBHOOK_URL=<wehbookurl>`'
    )
    .option('-c, --cron <value>', 'Cron Job', '* * * * *')
    .option('-e, --epoch <epoch>', 'Epoch', '579')
    .action(async (options: CronOptions) => {
      const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || ''
      if (!DISCORD_WEBHOOK_URL) {
        console.log(
          chalk.yellow(
            '⚠️ DISCORD_WEBHOOK_URL is not set\nPlease set .env file'
          )
        )
        process.exit(1)
      }
      const triggerEpoch = Number(options.epoch)
      Logger.normal(`🕰️ Running Cron Job: ${options.cron}`)
      cron.schedule(options.cron, async () => {
        const epoch = getEpochRemote()
        if (Number(epoch) === triggerEpoch) {
          await sendDiscord(
            `Current Epoch: ${epoch} - Stopping Solana Validator!`,
            {
              webhookUrl: DISCORD_WEBHOOK_URL,
            }
          )
          stopSolana()
          await sendDiscord(
            `Current Epoch: ${epoch} - Stopped Solana Validator!`,
            {
              webhookUrl: DISCORD_WEBHOOK_URL,
            }
          )
          process.exit(0)
        }
        console.log({ epoch })
      })
    })

  crond
    .command('halt')
    .description('Solv Node Halt Discord Notification Command')
    .action(async (options: any) => {
      const cmd = `npx pm2 start solv --name solvHalt -- cron watchHalt`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })

  crond
    .command('monitor')
    .alias('m')
    .description('Monitor Solana Validator by pm2')
    .action(() => {
      const cmd = `npx pm2 monit`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })

  crond
    .command('status')
    .alias('s')
    .description('Show pm2 status')
    .action(() => {
      const cmd = `npx pm2 status`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })

  crond
    .command('log')
    .alias('l')
    .option('-i, --id <id>', 'pm2 id', '')
    .description('Show pm2 log')
    .action((options: { id: string }) => {
      let cmd = `npx pm2 log`
      if (options.id !== '') {
        cmd = `npx pm2 log ${options.id}`
      }
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })

  crond
    .command('delete')
    .alias('d')
    .option('-i, --id <id>', 'pm2 id', '')
    .description('Delete pm2 task')
    .action((options: { id: string }) => {
      if (options.id === '') {
        console.log(chalk.yellow('⚠️ Please set pm2 id'))
      }
      const cmd = `npx pm2 delete ${options.id}`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })

  crond
    .command('restart')
    .alias('r')
    .option('-i, --id <id>', 'pm2 id', '')
    .description('Restart pm2 task')
    .action((options: { id: string }) => {
      if (options.id === '') {
        console.log(chalk.yellow('⚠️ Please set pm2 id'))
      }
      const cmd = `npx pm2 restart ${options.id}`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
