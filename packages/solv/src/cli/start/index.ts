import { program } from '@/index'
import { startSolana } from './startSolana'
import { DefaultConfigType } from '@/config/types'

export const startCommand = (config: DefaultConfigType) => {
  program
    .command('start')
    .description('Start Solana Validator')
    .action(() => {
      startSolana(config)
      process.exit(0)
    })
}
