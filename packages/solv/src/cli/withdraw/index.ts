import { program } from '@/index'
import { withdraw } from './withdraw'
import { DefaultConfigType } from '@/config/types'

type WithdrawOptions = {
  all: boolean
}

export const withdrawCommands = (config: DefaultConfigType) => {
  program
    .command('withdraw')
    .option('-a, --all', 'Withdraw All SOL', false)
    .description('Withdraw SOL from Vote Account to Authority Account')
    .action(async (options: WithdrawOptions) => {
      await withdraw(config, options.all)
      process.exit(0)
    })
}
