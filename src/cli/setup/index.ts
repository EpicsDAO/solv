import { program } from '@/index'
import { setup } from './setup'

export const setupCommands = async () => {
  program
    .command('setup')
    .description('Solana Setup Command')
    .action(async () => {
      console.log('setup')
      await setup()
    })
}
