import dotenv from 'dotenv'
import { Command } from 'commander'
import { VERSION } from '@/lib/version'
import {
  catchupCommand,
  logCommands,
  monitorCommand,
  startCommand,
  stopCommand,
  updateCommands,
  stakeCommands,
  setupCommands,
  checkCommpands,
  restartCommand,
  installCommands,
  cronCommands,
  statusCommands,
  configCommands,
  scpCommands,
} from '@/cli'

import { getEpoch } from './cli/cron/getEpoch'
import { getSlot } from './cli/cron/getSlot'
import { Logger } from './lib/logger'

dotenv.config()

export const program = new Command()
program.name('solv').description('CLI for Solana Validators').version(VERSION)

async function main() {
  try {
    program
      .command('solv')
      .description('Show Solv AA')
      .action(() => {
        Logger.solvAA()
        Logger.installMessage()
      })
    program
      .command('epoch')
      .description('Get Current Epoch')
      .action(() => {
        const epoch = getEpoch()
        console.log({ epoch })
      })

    program
      .command('slot')
      .description('Get Current Slot')
      .action(() => {
        const slot = getSlot()
        console.log({ slot })
      })

    catchupCommand()
    monitorCommand()
    configCommands()
    statusCommands()
    startCommand()
    restartCommand()
    stopCommand()
    checkCommpands()
    installCommands()
    scpCommands()
    await cronCommands()
    await setupCommands()
    await stakeCommands()
    await updateCommands()
    await logCommands()
    await program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
