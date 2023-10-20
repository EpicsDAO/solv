import { program } from '@/index'
import { setup } from './setup'
import { startValidator } from './startValidator'
import chalk from 'chalk'
import { VALIDATOR_STARTUP_SCRIPT } from '@/config'
import { setupVoteAccount } from './setupVoteAccount'
import { airdrop } from './airdrop'

export const setupCommands = async () => {
  program
    .command('setup')
    .description('Setup Solana Validator All-in-One')
    .option('--sh', 'Update Validator StartUp Bash Script', false)
    .option('--vote', 'Setup Vote Account', false)
    .action((options) => {
      if (options.sh) {
        console.log(chalk.white(`Generating ${VALIDATOR_STARTUP_SCRIPT} ...`))
        startValidator()
      } else if (options.vote) {
        console.log(chalk.white('Setting up Vote Account ...'))
        setupVoteAccount()
      } else {
        console.log(chalk.white('Setting up Solana Validator ...'))
        setup()
      }
    })

  program
    .command('airdrop')
    .alias('ad')
    .description('Airdrop to Solana Account')
    .action(() => {
      airdrop()
    })
}
