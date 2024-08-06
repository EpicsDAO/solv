import { program } from '@/index'
import { monitorUpdate, updateVersion } from './update'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { updateSolv } from './updateSolv'
import { spawnSync } from 'child_process'
import {
  CONFIG,
  MAINNET_TYPES,
  SERVICE_PATHS,
  SOLV_TYPES,
} from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { jitoUpdate } from './jitoUpdate'
import { updateJitoSolvConfig } from '@/lib/updateJitoSolvConfig'
import { JITO_CONFIG } from '@/config/jitConfig'
import { updateCommission, updateCommissionAsk } from './updateCommission'
import { setupLogrotate } from '../setup/setupLogrotate'
import { updateFirewall } from '../setup/updateFirewall'
import autoUpdate from './autoUpdate'
import getSolvVersion from '../epochTimer/getSolvVersion'

export * from './update'

export type UpdateOptions = {
  version: string
  monitor: boolean
  background: boolean
  commission: number
  logrotate: boolean
  firewall: boolean
  config: boolean
  auto: boolean
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
    .option('-c, --commission', 'Update Commission', false)
    .option('-l, --logrotate', 'Setup Logrotate', false)
    .option('-f, --firewall', 'Update Firewall', false)
    .option('--config', 'Update Solv Config Default Solana Version', false)
    .option('--auto', 'Auto Update', false)
    .action(async (options: UpdateOptions) => {
      const solvVersion = getSolvVersion()
      const isTest =
        solvConfig.config.SOLV_TYPE === SOLV_TYPES.TESTNET_VALIDATOR
          ? true
          : false
      const deliquentStake = isTest
        ? CONFIG.TESTNET_DELINQUENT_STAKE
        : CONFIG.MAINNET_DELINQUENT_STAKE
      console.log(chalk.white(`Current solv version: ${solvVersion}`))

      // Auto Update
      if (options.auto) {
        await autoUpdate(solvConfig)
        return
      }
      // Only Update solv.config.json default solana version
      if (options.config) {
        updateSolvConfig({
          SOLANA_VERSION: CONFIG.SOLANA_VERSION,
          TESTNET_SOLANA_VERSION: CONFIG.TESTNET_SOLANA_VERSION,
          MAINNET_SOLANA_VERSION: CONFIG.MAINNET_SOLANA_VERSION,
        })
        updateJitoSolvConfig({
          version: JITO_CONFIG.version,
          tag: JITO_CONFIG.tag,
        })
        console.log(
          chalk.green(
            '✔️ Updated Solv Config Default Solana Version\n\n You can now run `solv i` to install the latest version',
          ),
        )
        return
      }
      if (options.logrotate) {
        spawnSync(`rm -rf ${SERVICE_PATHS.SOL_LOGROTATE}`, { shell: true })
        setupLogrotate()
        return
      }
      if (options.firewall) {
        await updateFirewall()
        return
      }

      if (options.monitor) {
        const version =
          solvConfig.config.SOLV_TYPE === SOLV_TYPES.MAINNET_VALIDATOR
            ? CONFIG.MAINNET_SOLANA_VERSION
            : CONFIG.TESTNET_SOLANA_VERSION
        updateVersion(version)
        Logger.normal(
          `✔️ Monitoring Update with Max Delinquent Stake ${chalk.green(
            deliquentStake,
          )}`,
        )
        monitorUpdate(deliquentStake)
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
            monitorUpdate(deliquentStake, true)
            return
          }
          version = CONFIG.MAINNET_SOLANA_VERSION
          updateVersion(version)
          updateSolvConfig({
            SOLANA_VERSION: version,
            MAINNET_SOLANA_VERSION: version,
          })
          monitorUpdate(deliquentStake, true)
          return
        } else {
          version = CONFIG.TESTNET_SOLANA_VERSION
          updateVersion(version)
          updateSolvConfig({
            SOLANA_VERSION: version,
            TESTNET_SOLANA_VERSION: version,
          })
          Logger.normal(`✔️ Update to Solana Version ${chalk.green(version)}`)
          monitorUpdate(deliquentStake, true)
          return
        }
      } else if (options.commission) {
        const ansewr = await updateCommissionAsk()
        updateCommission(ansewr.commission, isTest)
      } else {
        updateSolv()
      }
    })
}
