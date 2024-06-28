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
  clientCommands,
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
import epochTimer from './lib/fetchEpochData'
import { transferCommands } from './cli/transfer'
import { withdrawCommands } from './cli/withdraw'
import { NETWORK_TYPES } from './config/config'
import { harvestCommands } from './cli/harvest'
import getBalance, { KeyType } from './lib/solana/getBalance'

dotenv.config()
const solvConfig = readOrCreateDefaultConfig()

export const SOLANA_RPC_URL =
  solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
    ? 'https://api.testnet.solana.com'
    : process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
export const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || ''
export const MAX_RETRIES = Number(process.env.MAX_RETRIES) || 3
if (isNaN(MAX_RETRIES)) {
  throw new Error(`Invalid MAX_RETRIES\nPlease Check .env File`)
}

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
    clientCommands(solvConfig)
    balanceCommands(solvConfig)
    mountCommands(solvConfig)
    relayerCommands()
    transferCommands(solvConfig)
    withdrawCommands(solvConfig)
    harvestCommands(solvConfig)
    dfCommands()

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
        monitorSolana()
      })

    program
      .command('catchup')
      .description('Check Solana Catchup Status')
      .alias('ca')
      .action(() => {
        solanaCatchup()
      })

    program
      .command('epochTimer')
      .description('Check Solana Epoch Timer')
      .action(async () => {
        await epochTimer(SOLANA_RPC_URL, DISCORD_WEBHOOK_URL)
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
