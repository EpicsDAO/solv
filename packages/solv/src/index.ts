import dotenv from 'dotenv'
import { Command } from 'commander'
import { VERSION } from '@/lib/version'
import { readOrCreateDefaultConfig } from '@/lib/readOrCreateDefaultConfig'
import {
  logCommands,
  startCommand,
  stopCommand,
  updateCommands,
  stakeCommands,
  setupCommands,
  restartCommand,
  installCommands,
  cronCommands,
  statusCommands,
  scpCommands,
  serverCommands,
  getCommands,
  mountCommands,
  relayerCommands,
  dfCommands,
} from '@/cli'
import { balanceCommands } from './cli/balance'
import { rmLogs } from './cli/setup/rmLogs'
import { rmSnapshot } from './cli/setup/rmSnapshot'
import { change } from './cli/change'
import { monitorSolana } from './cli/get/monitorSolana'
import { solanaCatchup } from './cli/get/solanaCatchup'
import { showConfig } from './cli/get/showConfig'
import { transferCommands } from './cli/transfer'
import { withdrawCommands } from './cli/withdraw'
import { NETWORK_TYPES, SOLANA_TESTNET_RPC_URL } from './config/config'
import { harvestCommands } from './cli/harvest'
import { swapCommands } from './cli/swap'
import { epochTimerCommands } from './cli/epochTimer'
import { switchCommand } from './cli/switch'

dotenv.config()
const solvConfig = readOrCreateDefaultConfig()

export const SOLANA_RPC_URL =
  solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
    ? SOLANA_TESTNET_RPC_URL
    : solvConfig.config.RPC_URL
export const DISCORD_WEBHOOK_URL = solvConfig.config.DISCORD_WEBHOOK_URL
export const MAX_RETRIES = 3

export const program = new Command()
program
  .name('solv')
  .description(solvConfig.locale.cmds.description)
  .helpOption('-h, --help', solvConfig.locale.cmds.help)
  .version(VERSION, '-V', solvConfig.locale.cmds.version)

async function main() {
  try {
    serverCommands(solvConfig)
    startCommand(solvConfig)
    restartCommand(solvConfig)
    stopCommand(solvConfig)
    statusCommands(solvConfig)
    updateCommands(solvConfig)
    logCommands(solvConfig)
    installCommands(solvConfig)
    stakeCommands(solvConfig)
    getCommands(solvConfig)
    scpCommands(solvConfig)
    cronCommands(solvConfig)
    setupCommands(solvConfig)
    balanceCommands(solvConfig)
    mountCommands(solvConfig)
    relayerCommands()
    transferCommands(solvConfig)
    withdrawCommands(solvConfig)
    harvestCommands(solvConfig)
    dfCommands()
    swapCommands(solvConfig)
    epochTimerCommands(solvConfig)
    switchCommand(program, solvConfig)

    program
      .command('rm:log')
      .description('Remove Logs')
      .action(() => {
        rmLogs()
      })

    program
      .command('rm:snapshot')
      .description('Remove Snapshot')
      .action(() => {
        rmSnapshot()
      })

    program
      .command('change')
      .description('Change Identity of Validator to New Validator')
      .action(() => {
        change()
      })

    program
      .command('monitor')
      .alias('m')
      .description('Monitor Solana Node')
      .action(() => {
        monitorSolana(solvConfig)
      })

    program
      .command('catchup')
      .description('Check Solana Catchup Status')
      .alias('c')
      .alias('ca')
      .action(() => {
        solanaCatchup()
      })

    program
      .command('config')
      .description('Show Solv Config')
      .action(() => {
        showConfig()
      })

    await program
      .addHelpCommand('help [cmd]', solvConfig.locale.cmds.help)
      .parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
