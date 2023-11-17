import { program } from '@/index'
import { setup } from './setup'
import { startValidator } from './startValidator'
import chalk from 'chalk'
import { DEFAULT_COMMISSION, VALIDATOR_STARTUP_SCRIPT } from '@/config'
import { setupVoteAccount } from './setupVoteAccount'
import { airdrop } from './airdrop'
import { setupKeys } from './setupKeys'
import inquirer from 'inquirer'
import { onlyGenKeys } from './onlyGenKeys'

export const setupCommands = async () => {
  program
    .command('setup')
    .description('Setup Solana Validator All-in-One')
    .option('--sh', 'Update Validator StartUp Bash Script', false)
    .option('--vote', 'Setup Vote Account', false)
    .option('--key', 'Setup Validator Keypairs', false)
    .option(
      '--commission <number>',
      'Set Validator Commission',
      DEFAULT_COMMISSION.toString()
    )
    .action(async (options) => {
      const commission = Number(options.commission)
      if (options.sh) {
        console.log(chalk.white(`Generating ${VALIDATOR_STARTUP_SCRIPT} ...`))
        startValidator()
      } else if (options.vote) {
        console.log(chalk.white('Setting up Vote Account ...'))
        setupVoteAccount(commission)
      } else if (options.key) {
        console.log(chalk.white('Setting up Validator Keypairs ...'))
        onlyGenKeys(commission)
      } else {
        console.log(chalk.white('Setting up Solana Validator ...'))
        setup(commission)
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
