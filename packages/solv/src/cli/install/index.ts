import { program } from '@/index'
import { updateVersion } from '../update'
import { CONFIG, MAINNET_TYPES, NETWORK_TYPES } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { jitoUpdate } from '../update/jitoUpdate'
import { JITO_CONFIG } from '@/config/jitConfig'

export const installCommands = (solvConfig: ConfigParams) => {
  const isTestnet = solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
  const version = isTestnet
    ? CONFIG.TESTNET_SOLANA_VERSION
    : CONFIG.MAINNET_SOLANA_VERSION
  const { cmds } = solvConfig.locale
  program
    .command('install')
    .alias('i')
    .description(cmds.install)
    .option(
      '-v, --version <version>',
      `Solana Version e.g. ${version}`,
      version,
    )
    .action((options: { version: string }) => {
      const isJito = solvConfig.config.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV
      if (isJito) {
        const jitoVersion = options.version || JITO_CONFIG.version
        const jitoTag = `v${jitoVersion}-jito`
        jitoUpdate(jitoTag)
        return
      }
      const isTestnet =
        solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      const solanaVersion = isTestnet
        ? CONFIG.TESTNET_SOLANA_VERSION
        : CONFIG.MAINNET_SOLANA_VERSION
      const solanaCLIVersion = options.version || solanaVersion
      updateVersion(solanaCLIVersion)
    })
}
