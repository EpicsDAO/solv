import { DEFAULT_SOLANA_VERSION, program } from '@/index'
import { updateVersion } from '../update'

export const installCommands = () => {
  program
    .command('install')
    .alias('i')
    .description('solv Install Command')
    .option(
      '-v, --version <version>',
      `Solana Version e.g. ${DEFAULT_SOLANA_VERSION}`,
      DEFAULT_SOLANA_VERSION
    )
    .action((cmdObj: any) => {
      updateVersion(cmdObj.version)
    })
}
