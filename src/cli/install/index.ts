import { program } from '@/index'
import { updateVersion } from '../update'
import { SolvConfig } from '@/types/solvTypes'

export const installCommands = () => {
  program
    .command('install')
    .alias('i')
    .description('Solana Install/Update Command')
    .option(
      '-v, --version <version>',
      `Solana Version e.g. ${SolvConfig.DEFAULT_SOLANA_VERSION}`,
      SolvConfig.DEFAULT_SOLANA_VERSION
    )
    .action((cmdObj: any) => {
      updateVersion(cmdObj.version)
    })
}
