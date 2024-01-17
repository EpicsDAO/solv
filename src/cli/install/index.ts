import { program } from '@/index'
import { updateVersion } from '../update'
import { CONFIG } from '@/config/config'

export const installCommands = () => {
  program
    .command('install')
    .alias('i')
    .description('Solana Install/Update Command')
    .option(
      '-v, --version <version>',
      `Solana Version e.g. ${CONFIG.SOLANA_VERSION}`,
      CONFIG.SOLANA_VERSION
    )
    .action((cmdObj: any) => {
      updateVersion(cmdObj.version)
    })
}
