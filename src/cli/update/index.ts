import { program } from '@/index'
import { monitorUpdate, updateVersion } from './update'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { updateSolv } from './updateSolv'
import { spawnSync } from 'child_process'
import { CONFIG, MAINNET_TYPES, SOLV_TYPES } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { nodeUpdate } from './nodeUpdate'
import { mainnetUpdate } from './mainnetUpdate'
import { jitoUpdate } from './jitoUpdate'
import { updateJitoSolvConfig } from '@/lib/updateJitoSolvConfig'
import { JITO_CONFIG } from '@/config/jitConfig'
import { updateCommission, updateCommissionAsk } from './updateCommission'

export * from './update'

export type UpdateOptions = {
  version: string
  monitor: boolean
  background: boolean
  node: boolean
  commission: number
}

export const updateCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('update')
    .alias('u')
    .description(cmds.update)
    .option(
      '-v, --version <version>',
      `Solana Version e.g ${CONFIG.SOLANA_VERSION}`,
      CONFIG.SOLANA_VERSION,
    )
    .option('-m, --monitor', 'Monitor Delinquent Stake Update', false)
    .option('-b, --background', 'No Monitor Delinquent Stake Update', false)
    .option('-n, --node', 'Update Node Version', false)
    .option('-c, --commission', 'Update Commission', false)
    .action(async (options: UpdateOptions) => {
      if (options.monitor) {
        updateVersion(options.version)
        Logger.normal(
          `✔️ Monitoring Update with Max Delinquent Stake ${chalk.green(
            CONFIG.DELINQUENT_STAKE,
          )}`,
        )
        monitorUpdate(CONFIG.DELINQUENT_STAKE)
      } else if (options.background) {
        let version = options.version
        if (
          solvConfig.config.SOLV_TYPE === SOLV_TYPES.MAINNET_VALIDATOR ||
          solvConfig.config.SOLV_TYPE === SOLV_TYPES.RPC_NODE
        ) {
          if (solvConfig.config.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV) {
            version = JITO_CONFIG.version
            jitoUpdate()
            updateJitoSolvConfig({ version, tag: `v${version}-jito` })
            monitorUpdate(CONFIG.DELINQUENT_STAKE, true)
            return
          }
          version = CONFIG.MAINNET_SOLANA_VERSION
          updateVersion(version)
          monitorUpdate(CONFIG.DELINQUENT_STAKE, true)
          return
        } else {
          version = CONFIG.TESTNET_SOLANA_VERSION
          updateVersion(version)
          updateSolvConfig({ SOLANA_VERSION: version })
          Logger.normal(`✔️ Update to Solana Version ${chalk.green(version)}`)
          monitorUpdate(CONFIG.DELINQUENT_STAKE, true)
          return
        }
      } else if (options.node) {
        nodeUpdate()
      } else if (options.commission) {
        const ansewr = await updateCommissionAsk()
        const isTest =
          solvConfig.config.SOLV_TYPE === SOLV_TYPES.TESTNET_VALIDATOR
            ? true
            : false
        updateCommission(ansewr.commission, isTest)
      } else {
        updateSolv()
      }
    })
}
