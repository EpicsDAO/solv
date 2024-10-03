import { program } from '@/index'
import { stopSolana } from './stopSolana'
import { DefaultConfigType } from '@/config/types'

export const stopCommand = (config: DefaultConfigType) => {
  program
    .command('stop')
    .description('Stop Solana Validator')
    .action(() => {
      stopSolana(config)
      process.exit(0)
    })
}
