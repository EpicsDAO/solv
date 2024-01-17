import { program } from '@/index'
import { setup } from './setup'
import { genStartupValidatorScript } from './genStartupValidatorScript'
import chalk from 'chalk'
import { setupVoteAccount } from './setupVoteAccount'
import { airdrop } from './airdrop'
import { onlyGenKeys } from './onlyGenKeys'
import { CONFIG, startupScriptPaths } from '@/config/config'

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
      CONFIG.COMMISSION.toString()
    )
    .action(async (options) => {
      const commission = Number(options.commission)
      const { scriptPath } = startupScriptPaths()
      if (options.sh) {
        console.log(chalk.white(`Generating ${scriptPath} ...`))
        genStartupValidatorScript()
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
}
