import { program } from '@/index'
import { updateVersion } from '../update'
import { jitoUpdate } from '../update/jitoUpdate'
import { DefaultConfigType } from '@/config/types'
import { Network, NodeType, ValidatorType } from '@/config/enums'
import {
  VERSION_JITO_MAINNET,
  VERSION_MAINNET,
  VERSION_SOLANA_RPC,
  VERSION_TESTNET,
} from '@/config/versionConfig'

export const installCommands = (config: DefaultConfigType) => {
  const isTestnet = config.NETWORK === Network.TESTNET
  let version = isTestnet ? VERSION_TESTNET : VERSION_MAINNET
  program
    .command('install')
    .alias('i')
    .description('Install Solana Client')
    .option(
      '-v, --version <version>',
      `Solana Version e.g. ${version}`,
      version,
    )
    .action(async (options: { version: string }) => {
      const isJito = config.VALIDATOR_TYPE === ValidatorType.JITO
      if (isJito) {
        const jitoVersion = options.version || VERSION_JITO_MAINNET
        const jitoTag = `v${jitoVersion}-jito`
        jitoUpdate(jitoTag)
        return
      }
      const isRPC = config.NODE_TYPE === NodeType.RPC
      if (isRPC) {
        version = VERSION_SOLANA_RPC
      }
      const solanaCLIVersion = options.version || version
      await updateVersion(solanaCLIVersion)
    })
}
