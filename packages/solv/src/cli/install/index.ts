import { program } from '@/index'
import { updateVersion } from '../update'
import { CONFIG, MAINNET_TYPES, NETWORK_TYPES } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { jitoUpdate } from '../update/jitoUpdate'
import { updateSolvConfig } from '@/lib/updateSolvConfig'

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
      const isTestnet =
        solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      const isJito = solvConfig.config.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV
      let version = isTestnet
        ? solvConfig.config.TESTNET_SOLANA_VERSION
        : solvConfig.config.MAINNET_SOLANA_VERSION
      updateSolvConfig({
        SOLANA_VERSION: version,
        TESTNET_SOLANA_VERSION: solvConfig.config.TESTNET_SOLANA_VERSION,
        MAINNET_SOLANA_VERSION: solvConfig.config.MAINNET_SOLANA_VERSION,
      })
      if (isJito) {
        const jitoTag = `v${version}-jito`
        jitoUpdate(jitoTag)
        return
      }
      updateVersion(version)
    })
}
