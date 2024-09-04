import { program } from '@/index'
import epochTimer from './epochTimer'
import { DefaultConfigType } from '@/config/types'

export const epochTimerCommands = (config: DefaultConfigType) => {
  program
    .command('epochTimer')
    .description('Check Solana Epoch Timer')
    .action(async () => {
      await epochTimer(config)
      process.exit(0)
    })
}
