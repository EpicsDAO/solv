import { VALIDATOR_STARTUP_SCRIPT, program } from '@/index'
import { setup } from './setup'
import { startValidator } from './startValidator'
import chalk from 'chalk'

export const setupCommands = async () => {
  program
    .command('setup')
    .description('Solana Setup Command')
    .option('--sh', 'Update Validator StartUp Bash Script', false)
    .option('--swap', 'Setup Swap', false)
    .action((options) => {
      console.log('setup')
      console.log({ options })
      if (options.sh) {
        console.log(chalk.white(`Generating ${VALIDATOR_STARTUP_SCRIPT} ...`))
        startValidator()
      } else {
        console.log(chalk.white('Setting up Solana Validator ...'))
        setup(options)
      }
    })
}
