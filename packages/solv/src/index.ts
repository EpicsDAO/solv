import 'dotenv/config'
import { Command } from 'commander'
import { VERSION } from '@/lib/version'
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
  getCommands,
  mountCommands,
  relayerCommands,
  dfCommands,
} from '@/cli'
import { balanceCommands } from './cli/balance'
import { rmLogs } from './cli/setup/rmLogs'
import { rmSnapshot } from './cli/setup/rmSnapshot'
import { monitorSolana } from './cli/get/monitorSolana'
import { solanaCatchup } from './cli/get/solanaCatchup'
import { showConfig } from './cli/get/showConfig'
import { transferCommands } from './cli/transfer'
import { withdrawCommands } from './cli/withdraw'
import { harvestCommands } from './cli/harvest'
import { epochTimerCommands } from './cli/epochTimer'
import { switchCommand } from './cli/switch'
import createSnapshot from './cli/get/createSnapshot'
import { swapCommand } from './cli/swap'
import readConfig from './config/readConfig'
import { jupiterCommands } from './cli/jupiter'
import chalk from 'chalk'

export const program = new Command()
program
  .name('solv')
  .description(`🪄  solv - Solana Validator Tool ✨`)
  .helpOption('-h, --help', `Display help for command`)
  .version(VERSION, '-V', `Display version`)

async function main() {
  try {
    // This config will be new config file - solv4.config.json
    const config = await readConfig()

    startCommand(config)
    restartCommand(config)
    stopCommand(config)
    statusCommands(config)
    updateCommands(config)
    logCommands()
    installCommands(config)
    stakeCommands(config)
    getCommands(config)
    scpCommands()
    cronCommands()
    setupCommands(config)
    balanceCommands(config)
    mountCommands()
    relayerCommands()
    transferCommands(config)
    withdrawCommands(config)
    harvestCommands(config)
    dfCommands()
    swapCommand(program, config)
    epochTimerCommands(config)
    switchCommand(program, config)
    jupiterCommands()

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
      .command('create:snapshot')
      .description('Create Snapshot')
      .option('-s, --slot <slot>', 'Slot')
      .option('-l, --ledger <ledger>', 'Ledger')
      .action((options: { slot: string; ledger: string }) => {
        console.log(chalk.white(`📝 Creating Snapshot...`))
        createSnapshot(options.slot, options.ledger)
      })

    program
      .command('monitor')
      .alias('m')
      .description('Monitor Solana Node')
      .action(() => {
        monitorSolana(config)
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
      .addHelpCommand('help [cmd]', 'Display help for command')
      .parseAsync(process.argv)
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}

main()
