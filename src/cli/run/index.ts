import { program } from '@/index'
import { runSolana } from './runSolana'

export const runCommand = () => {
  program
    .command('run')
    .description('Run Solana Commands')
    .action(async () => {
      runSolana()
    })
}
