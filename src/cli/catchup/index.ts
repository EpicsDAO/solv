import { program } from '@/index'
import { solanaCatchup } from './solanaCatchup'

export const catchupCommand = () => {
  program
    .command('monitor')
    .alias('m')
    .description('Monitor Solana Validator')
    .action(async () => {
      solanaCatchup()
    })
}
