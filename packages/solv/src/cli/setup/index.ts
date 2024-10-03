import { program } from '@/index'
import chalk from 'chalk'
import { setupVoteAccount } from '@/cli/setup/setupVoteAccount'
import { createSolvKeyPairs } from '@/lib/createSolvKeys'
import { DefaultConfigType } from '@/config/types'
import jupiterAPISetup from '@/cli/setup/template/jupiter/jupiterAPISetup'
import { readOrCreateJitoConfig } from '@/lib/readOrCreateJitoConfig'
import { daemonReload } from '@/lib/daemonReload'
import { setupV2 } from './setupV2'
import { jitoRelayerSetup } from './jitoRelayerSetup'
import rpcLog from '@/utils/rpcLog'
import { yellowstoneGeyser } from './template/geyser/yellowstoneGeyser'
import setupFiredancer from './firedancer/setupFiredancer'

type SetupOptions = {
  vote: boolean
  key: boolean
  relayer: boolean
  jupiter: boolean
  geyser: boolean
  firedancer: boolean
  skipInitConfig: boolean
  skipMount: boolean
}

export const setupCommands = (config: DefaultConfigType) => {
  program
    .command('setup')
    .description(`Setup Solana Validator`)
    .option('--vote', 'Setup Vote Account', false)
    .option('--key', 'Setup Validator Keypairs', false)
    .option('--relayer', 'Setup Jito Relayer', false)
    .option('--jupiter', 'Setup Jupiter Swap API', false)
    .option('--geyser', 'Setup Geyser', false)
    .option('--firedancer', 'Setup Firedancer', false)
    .option('--skip-init-config', 'Skip Initial Config', false)
    .option('--skip-mount', 'Skip Mount', false)
    .action(async (options: SetupOptions) => {
      try {
        if (options.vote) {
          console.log(chalk.white('Setting up Vote Account ...'))
          setupVoteAccount(config)
          process.exit(0)
        } else if (options.key) {
          console.log(chalk.white('Setting up Validator Keypairs ...'))
          createSolvKeyPairs(config)
          process.exit(0)
        } else if (options.relayer) {
          console.log(chalk.white('Setting up Jito Relayer ...'))
          const jitoConfig = await readOrCreateJitoConfig()
          const blockEngineUrl = jitoConfig.blockEngineUrl
          const isCoHost = false
          await jitoRelayerSetup(blockEngineUrl, isCoHost)
          console.log(
            chalk.green(
              'Jito Relayer Setup Completed\n\n$ solv relayer --help',
            ),
          )
          daemonReload()
          rpcLog()
          process.exit(0)
        } else if (options.jupiter) {
          console.log(chalk.white('Setting up Jupiter Swap API ...'))
          await jupiterAPISetup()
          daemonReload()
          rpcLog()
          process.exit(0)
        } else if (options.geyser) {
          console.log(chalk.white('Setting up Geyser ...'))
          await yellowstoneGeyser()
          return
        } else if (options.firedancer) {
          console.log(chalk.white('🔥 Setting up Firedancer ...'))
          await setupFiredancer()
          return
        }
        await setupV2(options.skipInitConfig, options.skipMount)
      } catch (error: any) {
        if (
          error.message.includes('User force closed the prompt') ||
          error.message.includes('initialConfigSetup')
        ) {
          console.error(chalk.cyan(`Exiting...🌛`))
          process.exit(0)
        }
        console.error(chalk.red(`Setup Error: ${error.message}`))
        process.exit(0)
      }
    })
}
