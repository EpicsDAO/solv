import { program } from '@/index'
import { updateVersion } from '../update'
import { CONFIG } from '@/config/config'
import { ConfigParams } from '@/lib/createDefaultConfig'

export const installCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('install')
    .alias('i')
    .description(cmds.install)
    .option(
      '-v, --version <version>',
      `Solana Version e.g. ${CONFIG.SOLANA_VERSION}`,
      CONFIG.SOLANA_VERSION,
    )
    .action((cmdObj: any) => {
      updateVersion(cmdObj.version)
    })
}
