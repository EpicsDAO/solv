import { program } from '@/index'
import { updateVersion } from '../update'
import { DEFAULT_SOLANA_VERSION } from '@/config'

export const installCommands = () => {
  program
    .command('install')
    .alias('i')
    .description('Solana Install/Update Command')
    .option(
      '-v, --version <version>',
      `Solana Version e.g. ${DEFAULT_SOLANA_VERSION}`,
      DEFAULT_SOLANA_VERSION
    )
    .action((cmdObj: any) => {
      updateVersion(cmdObj.version)
    })
}
