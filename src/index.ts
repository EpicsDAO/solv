import dotenv from 'dotenv'
import { Command } from 'commander'
import { VERSION } from '@/lib/version'
import { createDefaultConfig } from '@/lib/createDefaultConfig'
import {
  logCommands,
  startCommand,
  stopCommand,
  updateCommands,
  stakeCommands,
  setupCommands,
  checkCommands,
  restartCommand,
  installCommands,
  cronCommands,
  statusCommands,
  scpCommands,
  serverCommands,
  getCommands,
  mountCommands,
} from '@/cli'

dotenv.config()
const solvConfig = createDefaultConfig()

export const program = new Command()
program
  .name('solv')
  .description(solvConfig.locale.cmds.description)
  .helpOption('-h, --help', solvConfig.locale.cmds.help)
  .version(VERSION, '-v, --version', solvConfig.locale.cmds.version)

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
    checkCommands(solvConfig)
    getCommands(solvConfig)
    scpCommands(solvConfig)
    cronCommands(solvConfig)
    setupCommands(solvConfig)
    // mountCommands(solvConfig)

    await program
      .addHelpCommand('help [cmd]', solvConfig.locale.cmds.help)
      .parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
