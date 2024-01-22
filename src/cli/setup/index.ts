import { program } from '@/index'
import { setup } from './setup'
import { genStartupValidatorScript } from './genStartupValidatorScript'
import chalk from 'chalk'
import { setupVoteAccount } from './setupVoteAccount'
import { onlyGenKeys } from './onlyGenKeys'
import { CONFIG } from '@/config/config'
import { ConfigParams } from '@/lib/createDefaultConfig'

export const setupCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('setup')
    .description(cmds.setup)
    .option('--vote', 'Setup Vote Account', false)
    .option('--key', 'Setup Validator Keypairs', false)
    .option(
      '--commission <number>',
      'Set Validator Commission',
      CONFIG.COMMISSION.toString(),
    )
    .action(async (options) => {
      const commission = Number(options.commission)
      if (options.vote) {
        console.log(chalk.white('Setting up Vote Account ...'))
        setupVoteAccount(commission)
      } else if (options.key) {
        console.log(chalk.white('Setting up Validator Keypairs ...'))
        onlyGenKeys(commission)
      } else {
        console.log(chalk.white('Setting up Solana Validator ...'))
        await setup(solvConfig)
      }
    })
}
