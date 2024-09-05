import { program } from '@/index'
import { monitorUpdate, updateVersion } from './update'
import chalk from 'chalk'
import { updateSolv } from './updateSolv'
import { jitoUpdate } from './jitoUpdate'
import { updateJitoSolvConfig } from '@/lib/updateJitoSolvConfig'
import { updateCommission, updateCommissionAsk } from './updateCommission'
import { updateFirewall } from '../setup/updateFirewall'
import autoUpdate from './autoUpdate'
import getSolvVersion from '../epochTimer/getSolvVersion'
import { updateDefaultConfig } from '@/config/updateDefaultConfig'
import { DefaultConfigType } from '@/config/types'
import {
  MNT_DISK_TYPE,
  Network,
  NodeType,
  RpcType,
  ValidatorType,
} from '@/config/enums'
import {
  VERSION_JITO_MAINNET,
  VERSION_JITO_RPC,
  VERSION_JITO_TESTNET,
  VERSION_MAINNET,
  VERSION_SOLANA_RPC,
  VERSION_TESTNET,
} from '@/config/versionConfig'
import { readOrCreateDefaultConfig } from '@/lib/readOrCreateDefaultConfig'
import { MAINNET_TYPES, NETWORK_TYPES, SOLV_TYPES } from '@/config/config'

export * from './update'

export type UpdateOptions = {
  version: string
  background: boolean
  commission: number
  firewall: boolean
  config: boolean
  auto: boolean
}

export const updateCommands = (config: DefaultConfigType) => {
  const isTestnet = config.NETWORK === Network.TESTNET
  const isRPC = config.NODE_TYPE === NodeType.RPC
  const isJito = config.VALIDATOR_TYPE === ValidatorType.JITO
  let version = isTestnet ? VERSION_TESTNET : VERSION_MAINNET
  if (isJito) {
    version = VERSION_JITO_MAINNET
    if (isTestnet) {
      version = VERSION_JITO_TESTNET
    }
  }
  if (isRPC) {
    version = VERSION_SOLANA_RPC
    if (isJito) {
      version = VERSION_JITO_RPC
    }
  }
  program
    .command('update')
    .alias('u')
    .description('Update Command')
    .option('-v, --version <version>', `Solana Version e.g ${version}`, version)
    .option('-b, --background', 'No Monitor Delinquent Stake Update', false)
    .option('-c, --commission', 'Update Commission', false)
    .option('-f, --firewall', 'Update Firewall', false)
    .option('--config', 'Update Solv Config Default Solana Version', false)
    .option('--auto', 'Auto Update', false)
    .action(async (options: UpdateOptions) => {
      const solvVersion = getSolvVersion()
      const deliquentStake = isTestnet
        ? config.TESTNET_DELINQUENT_STAKE
        : config.MAINNET_DELINQUENT_STAKE
      console.log(chalk.white(`Current solv version: ${solvVersion}`))

      // Auto Update
      if (options.auto) {
        await autoUpdate(config)
        return
      }
      // Only Update solv.config.json default solana version
      if (options.config) {
        // Temporarily!!
        // Migrate solv.config.json to solv4.config.json
        const oldConfig = readOrCreateDefaultConfig().config
        const isTestnetOld = oldConfig.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
        const isRPCOld = oldConfig.SOLV_TYPE === SOLV_TYPES.RPC_NODE
        const isJitoOld = oldConfig.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV
        const newConfigBody: DefaultConfigType = {
          NETWORK: isTestnetOld ? Network.TESTNET : Network.MAINNET,
          NODE_TYPE: isRPCOld ? NodeType.RPC : NodeType.VALIDATOR,
          MNT_DISK_TYPE:
            oldConfig.DISK_TYPES === 0
              ? MNT_DISK_TYPE.DOUBLE
              : MNT_DISK_TYPE.SINGLE,
          RPC_TYPE: isRPCOld ? RpcType.JITO : RpcType.NONE,
          VALIDATOR_TYPE: isJitoOld
            ? ValidatorType.JITO
            : isTestnetOld
              ? ValidatorType.AGAVE
              : ValidatorType.SOLANA,
          TESTNET_SOLANA_VERSION: oldConfig.TESTNET_SOLANA_VERSION,
          MAINNET_SOLANA_VERSION: oldConfig.MAINNET_SOLANA_VERSION,
          NODE_VERSION: oldConfig.NODE_VERSION,
          TESTNET_DELINQUENT_STAKE: oldConfig.TESTNET_DELINQUENT_STAKE,
          MAINNET_DELINQUENT_STAKE: oldConfig.MAINNET_DELINQUENT_STAKE,
          COMMISSION: oldConfig.COMMISSION,
          DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY:
            oldConfig.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY,
          STAKE_ACCOUNTS: oldConfig.STAKE_ACCOUNT,
          HARVEST_ACCOUNT: oldConfig.HARVEST_ACCOUNT,
          IS_MEV_MODE: oldConfig.IS_MEV_MODE,
          RPC_URL: oldConfig.RPC_URL,
          KEYPAIR_PATH: oldConfig.KEYPAIR_PATH,
          DISCORD_WEBHOOK_URL: oldConfig.DISCORD_WEBHOOK_URL,
          AUTO_UPDATE: oldConfig.AUTO_UPDATE,
          AUTO_RESTART: oldConfig.AUTO_RESTART,
          IS_DUMMY: false,
          API_KEY: '',
        }

        await updateDefaultConfig(newConfigBody)
        // --- End of Temporarily!!

        await updateDefaultConfig({
          TESTNET_SOLANA_VERSION: VERSION_TESTNET,
          MAINNET_SOLANA_VERSION: VERSION_MAINNET,
        })
        if (isJito) {
          const jitoVersion = isTestnet
            ? VERSION_JITO_TESTNET
            : VERSION_JITO_MAINNET
          await updateJitoSolvConfig({
            version: jitoVersion,
            tag: `v${jitoVersion}-jito`,
          })
        }
        console.log(
          chalk.green(
            '✔️ Updated Solv Config Default Solana Version\n\n You can now run `solv i` to install the latest version',
          ),
        )
        return
      }
      if (options.firewall) {
        await updateFirewall()
        return
      }

      if (options.background) {
        let version = options.version
        await updateDefaultConfig({
          TESTNET_SOLANA_VERSION: config.TESTNET_SOLANA_VERSION,
          MAINNET_SOLANA_VERSION: config.MAINNET_SOLANA_VERSION,
        })

        if (isJito) {
          jitoUpdate()
          await updateJitoSolvConfig({ version, tag: `v${version}-jito` })
          await monitorUpdate(deliquentStake, true)
          return
        }
        await updateVersion(version)
        await monitorUpdate(deliquentStake, true)
        return
      } else if (options.commission) {
        const ansewr = await updateCommissionAsk()
        updateCommission(ansewr.commission, isTestnet)
      } else {
        updateSolv()
      }
    })
}
