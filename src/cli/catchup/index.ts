import { program } from '@/index'
import { solanaCatchup } from './solanaCatchup'

export const catchupCommand = () => {
  program
    .command('catchup')
    .alias('ca')
    .description('Solana Validator Catchup Command')
    .action(async () => {
      solanaCatchup()
    })
}
