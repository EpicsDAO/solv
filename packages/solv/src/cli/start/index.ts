import { program } from '@/index'
import { startSolana } from './startSolana'

export const startCommand = () => {
  program
    .command('start')
    .description('Start Solana Validator')
    .action(() => {
      startSolana()
      process.exit(0)
    })
}
