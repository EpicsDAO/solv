import { program } from '@/index'
import { stopSolana } from './stopSolana'

export const stopCommand = () => {
  program
    .command('stop')
    .description('Stop Solana Validator')
    .action(() => {
      stopSolana()
      process.exit(0)
    })
}
