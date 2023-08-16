import { program } from '@/index'
import { setup } from './setup'
import { startValidator } from './startValidator'
import chalk from 'chalk'
import { SolvConfig } from '@/types/solvTypes'

export const setupCommands = async () => {
  program
    .command('setup')
    .description('Solana Setup Command')
    .option('--sh', 'Update Validator StartUp Bash Script', false)
    .option('--swap', 'Setup Swap', false)
    .option('-p, --path <path>', 'Path to Solana Directory', '/dev/vdb')
    .action((options) => {
      console.log('setup')
      console.log({ options })
      if (options.sh) {
        console.log(
          chalk.white(`Generating ${SolvConfig.VALIDATOR_STARTUP_SCRIPT} ...`)
        )
        startValidator()
      } else {
        console.log(chalk.white('Setting up Solana Validator ...'))
        setup(options)
      }
    })
}
