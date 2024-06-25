import { program } from '@/index'
import { setup } from '@/cli/setup/setup'
import chalk from 'chalk'
import { setupVoteAccount } from '@/cli/setup/setupVoteAccount'
import {
  ConfigParams,
  readOrCreateDefaultConfig,
} from '@/lib/readOrCreateDefaultConfig'
import { createSolvKeyPairs } from '@/lib/createSolvKeys'
import { testnetSetup } from './testnetSetup'
import { setupSwap } from './setupSwap'

type SetupOptions = {
  vote: boolean
  key: boolean
  testnet: boolean
  mainnet: boolean
  rpc: boolean
  swap: boolean
}

export const setupCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale

  program
    .command('setup')
    .description(cmds.setup)
    .option('--vote', 'Setup Vote Account', false)
    .option('--key', 'Setup Validator Keypairs', false)
    .option('--swap', 'Setup Swap', false)
    .action(async (options: SetupOptions) => {
      const config = readOrCreateDefaultConfig()
      if (options.vote) {
        console.log(chalk.white('Setting up Vote Account ...'))
        setupVoteAccount(config)
      } else if (options.key) {
        console.log(chalk.white('Setting up Validator Keypairs ...'))
        createSolvKeyPairs(config)
      } else if (options.testnet) {
        console.log(chalk.white('Setting up Testnet Validator ...'))
        await testnetSetup(config)
      } else if (options.swap) {
        await setupSwap()
      } else {
        console.log(chalk.white('Setting up Solana Validator ...'))
        await setup(config)
      }
    })
}
