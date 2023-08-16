import { program } from '@/index'
import { updateVersion } from '../update'
import { SolvConfig } from '@/types/solvTypes'
import { execSync } from 'child_process'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'

export const installCommands = () => {
  program
    .command('install')
    .alias('i')
    .description('solv Install Command')
    .option(
      '-v, --version <version>',
      `Solana Version e.g. ${SolvConfig.DEFAULT_SOLANA_VERSION}`,
      SolvConfig.DEFAULT_SOLANA_VERSION
    )
    .action((cmdObj: any) => {
      if (!isSolanaInstalled()) {
        Logger.normal(
          `Did you forget to restart your terminal?\n\n${chalk.green(
            `$ source ~/.profile`
          )}`
        )
        return
      }
      updateVersion(cmdObj.version)
    })
}

function isSolanaInstalled() {
  try {
    execSync('solana --version')
    return true
  } catch (error) {
    return false
  }
}
