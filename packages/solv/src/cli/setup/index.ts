import { program } from '@/index'
import { setup } from '@/cli/setup/setup'
import chalk from 'chalk'
import { setupVoteAccount } from '@/cli/setup/setupVoteAccount'
import {
  ConfigParams,
  readOrCreateDefaultConfig,
} from '@/lib/readOrCreateDefaultConfig'
import { createSolvKeyPairs } from '@/lib/createSolvKeys'
import { setupSwap } from './setupSwap'
import { writeFile } from 'fs/promises'
import { spawnSync } from 'node:child_process'
import { startTestnetAgaveValidatorScript } from '@/template/startupScripts/startTestnetAgaveValidatorScript'
import { NETWORK_TYPES } from '@/config/config'

type SetupOptions = {
  vote: boolean
  key: boolean
  swap: boolean
  script: boolean
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
      } else if (options.swap) {
        await setupSwap()
      } else if (options.script) {
        if (config.config.SOLANA_NETWORK !== NETWORK_TYPES.TESTNET) {
          console.log('This command is only available for testnet')
          return
        }
        // Restart Instructions
        console.log(chalk.white('Updating Solana Validator Startup Script...'))
        // Stop the validator
        const stopCmd = `solv stop`
        spawnSync(stopCmd, { shell: true, stdio: 'inherit' })
        // Remove the startup script
        const createSnapshotCmd = `solv rm:snapshot`
        spawnSync(createSnapshotCmd, { shell: true, stdio: 'inherit' })
        // Generate the startup script
        const body = startTestnetAgaveValidatorScript()
        const filePath = '/home/solv/start-validator.sh'
        writeFile(filePath, body, 'utf-8')
        // Make the script executable
        const cmd = `sudo chmod +x ${filePath}`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
        // Restart the validator
        const startCmd = `solv start`
        spawnSync(startCmd, { shell: true, stdio: 'inherit' })
      } else {
        console.log(chalk.white('Setting up Solana Validator ...'))
        await setup(config)
      }
    })
}
