import { program } from '@/index'
import { setup } from '@/cli/setup/setup'
import chalk from 'chalk'
import { setupVoteAccount } from '@/cli/setup/setupVoteAccount'
import { ConfigParams } from '@/lib/createDefaultConfig'
import { createSolvKeyPairs } from '@/lib/createSolvKeys'

export const setupCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('setup')
    .description(cmds.setup)
    .option('--vote', 'Setup Vote Account', false)
    .option('--key', 'Setup Validator Keypairs', false)
    .action(async (options) => {
      if (options.vote) {
        console.log(chalk.white('Setting up Vote Account ...'))
        setupVoteAccount(solvConfig)
      } else if (options.key) {
        console.log(chalk.white('Setting up Validator Keypairs ...'))
        createSolvKeyPairs(solvConfig)
      } else {
        console.log(chalk.white('Setting up Solana Validator ...'))
        await setup(solvConfig)
      }
    })
}
