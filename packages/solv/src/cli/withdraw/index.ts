import { program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { withdraw } from './withdraw'

type WithdrawOptions = {
  all: boolean
}

export const withdrawCommands = (solvConfig: ConfigParams) => {
  program
    .command('withdraw')
    .option('-a, --all', 'Withdraw All SOL', false)
    .description('Withdraw SOL from Vote Account to Authority Account')
    .action(async (options: WithdrawOptions) => {
      await withdraw(solvConfig, options.all)
    })
}
