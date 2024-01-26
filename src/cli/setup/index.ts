import { program } from '@/index'
import { setup } from '@/cli/setup/setup'
import chalk from 'chalk'
import { setupVoteAccount } from '@/cli/setup/setupVoteAccount'
import { ConfigParams, createDefaultConfig } from '@/lib/createDefaultConfig'
import { createSolvKeyPairs } from '@/lib/createSolvKeys'
import { testnetSetup } from './testnetSetup'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { updateLogrotate } from '@/cli/setup/updateLogrotate'
import { rmLogs } from './rmLogs'

type SetupOptions = {
  vote: boolean
  key: boolean
  testnet: boolean
  mainnet: boolean
  rpc: boolean
  commission: string
}

export const setupCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale

  program
    .command('updateLog')
    .description('Update Logrotate')
    .action(() => {
      updateLogrotate()
    })

  program
    .command('rmLogs')
    .description('Remove Logs')
    .action(() => {
      rmLogs()
    })

  program
    .command('setup')
    .description(cmds.setup)
    .option('--vote', 'Setup Vote Account', false)
    .option('--key', 'Setup Validator Keypairs', false)
    .option('--testnet', 'Setup Testnet Validator', false)
    .option('--mainnet', 'Setup Mainnet Validator', false)
    .option('--rpc', 'Setup RPC Node', false)
    .option('--commission <commission>', 'Set commission rate', '10')
    .action(async (options: SetupOptions) => {
      updateSolvConfig({ COMMISSION: Number(options.commission) })
      const solvConfigReflectComission = createDefaultConfig()
      if (options.vote) {
        console.log(chalk.white('Setting up Vote Account ...'))
        setupVoteAccount(solvConfigReflectComission)
      } else if (options.key) {
        console.log(chalk.white('Setting up Validator Keypairs ...'))
        createSolvKeyPairs(solvConfigReflectComission)
      } else if (options.testnet) {
        console.log(chalk.white('Setting up Testnet Validator ...'))
        await testnetSetup(solvConfigReflectComission)
      } else {
        console.log(chalk.white('Setting up Solana Validator ...'))
        await setup(solvConfigReflectComission)
      }
    })
}
