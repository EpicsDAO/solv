import { program } from '@/index'
import { monitorSolana } from './monitorSolana'

export const monitorCommand = () => {
  program
    .command('monitor')
    .alias('m')
    .description('Monitor Solana Validator')
    .action(async () => {
      monitorSolana()
    })
}
