import dotenv from 'dotenv'
import { Command } from 'commander'
import { VERSION } from '@/lib/version'
import {
  logCommands,
  releaseCommands,
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
import { discordCommands } from './cli/discord'
import { getEpoch } from './cli/discord/getEpoch'
import { getSlot } from './cli/discord/getSlot'
import { statusCommands } from './cli/status'
import { startValidatorSh } from './template/startValitatorSh'
dotenv.config()

export const program = new Command()
program.name('solv').description('CLI for Solana Validators').version(VERSION)

async function main() {
  try {
    program
      .command('solv')
      .description('CLI for Solana Validators')
      .action(() => {
        console.log(startValidatorSh())
      })
    program
      .command('epoch')
      .description('Solana Epoch Command')
      .action(() => {
        const epoch = getEpoch()
        console.log({ epoch })
      })

    program
      .command('slot')
      .description('Solana Slot Command')
      .action(() => {
        const slot = getSlot()
        console.log({ slot })
      })
    statusCommands()
    startCommand()
    restartCommand()
    stopCommand()
    checkCommpands()
    installCommands()
    mountCommands()
    await discordCommands()
    await setupCommands()
    await dfCommands()
    await stakeCommands()
    await updateCommands()
    await logCommands()
    await releaseCommands()
    await program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
