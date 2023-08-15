import { program } from '@/index'
import cron from 'node-cron'
import { sendDiscord } from '@/lib/sendDiscord'
import { getEpoch } from './getEpoch'
import { Logger } from '@/lib/logger'
import { getSlot } from './getSlot'

export const discordCommands = async () => {
  const discord = program
    .command('discord')
    .description('Solv Discord Notification Command')

  discord
    .command('epoch')
    .description('Solv Discord Epoch Notification Command')
    .option('-c, --cron <value>', 'Cron Job', '0 0 * * *')
    .action(async (options: any) => {
      Logger.normal(`🕰️ Running Cron Job: ${options.cron}`)
      cron.schedule(options.cron, async () => {
        const epoch = getEpoch()
        console.log({ epoch })
        await sendDiscord(`Current Epoch: ${epoch}`)
      })
    })

  discord
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
}
