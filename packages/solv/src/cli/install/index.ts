import { program } from '@/index'
import { updateVersion } from '../update'
import { CONFIG, MAINNET_TYPES } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { jitoUpdate } from '../update/jitoUpdate'

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
    .action((options: { version: string }) => {
      if (solvConfig.config.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV) {
        const jitoTag = `v${options.version}-jito`
        jitoUpdate(jitoTag)
        return
      }
      updateVersion(options.version)
    })
}
