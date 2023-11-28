import { program } from '@/index'
import cron from 'node-cron'
import { sendDiscord } from '@/lib/sendDiscord'
import { getEpoch } from './getEpoch'
import { Logger } from '@/lib/logger'
import { getSlot } from './getSlot'
import { airdrop } from '../setup/airdrop'
import { spawnSync } from 'child_process'

export const cronCommands = async () => {
  const crond = program.command('cron').description('Cron Task Command')

  crond
    .command('epoch')
    .description('Solv Discord Epoch Notification Command')
    .option('-c, --cron <value>', 'Cron Job', '*/10 * * * *')
    .action(async (options: any) => {
      Logger.normal(`🕰️ Running Cron Job: ${options.cron}`)
      cron.schedule(options.cron, async () => {
        const epoch = getEpoch()
        if (Number(epoch) === 563) {
          const cmd = `solv stop`
          spawnSync(cmd, { shell: true, stdio: 'inherit' })
          process.exit(0)
        }
      })
    })

  crond
    .command('slot')
    .description('Solv Discord Slot Notification Command')
    .option('-c, --cron <value>', 'Cron Job', '0 0 * * *')
    .action(async (options: any) => {
      Logger.normal(`🕰️ Running Cron Job: ${options.cron}`)
      cron.schedule(options.cron, async () => {
        const slot = getSlot()
        console.log({ slot })
        await sendDiscord(`Current Slot: ${slot}`)
      })
    })

  crond
    .command('pm2')
    .description('Solana Airdrop Command')
    .option('-c, --cron <value>', 'Cron Job', '*/10 * * * *')
    .action(async (options: any) => {
      Logger.normal(`🕰️ Running Airdrop Cron Job: ${options.cron}`)
      cron.schedule(options.cron, async () => {
        airdrop()
      })
    })

  crond
    .command('airdrop')
    .description('Solana Airdrop Command by pm2')
    .action(async () => {
      const cmd = `npx pm2 start solv --name solvAirdrop -- cron pm2`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })

  crond
    .command('stopAirdrop')
    .description('Solana Airdrop Command by pm2')
    .action(async () => {
      const cmd = `npx pm2 stop solvAirdrop`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })

  crond
    .command('monit')
    .description('Monitor Solana Validator by pm2')
    .action(async () => {
      const cmd = `npx pm2 monit`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
