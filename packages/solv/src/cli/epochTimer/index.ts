import { program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import epochTimer from './epochTimer'

export const epochTimerCommands = (solvConfig: ConfigParams) => {
  program
    .command('epochTimer')
    .description('Check Solana Epoch Timer')
    .action(async () => {
      await epochTimer(solvConfig)
    })
}
