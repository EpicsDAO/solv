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
} from './cli'
import { stakeCommands } from './cli/stake'
import { dfCommands } from './cli/df'
import { setupCommands } from './cli/setup'
import { checkCommpands } from './cli/check'
import { restartCommand } from './cli/restart'
import { installCommands } from './cli/install'
import { mountCommands } from './cli/mt'
import { cronCommands } from './cli/cron'
import { getEpoch } from './cli/cron/getEpoch'
import { getSlot } from './cli/cron/getSlot'
import { statusCommands } from './cli/status'
import { configCommands } from './cli/config'
import { Logger } from './lib/logger'
import { scpCommands } from './cli/scp'

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
    mountCommands()
    scpCommands()
    await cronCommands()
    await setupCommands()
    await dfCommands()
    await stakeCommands()
    await updateCommands()
    await logCommands()
    await program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
