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
import { nodeUpdate } from './nodeUpdate'
import { jitoUpdate } from './jitoUpdate'
import { updateJitoSolvConfig } from '@/lib/updateJitoSolvConfig'
import { JITO_CONFIG } from '@/config/jitConfig'
import { updateCommission, updateCommissionAsk } from './updateCommission'
import { setupLogrotate } from '../setup/setupLogrotate'
import { updateFirewall } from '../setup/updateFirewall'
import updateOpenSSH from './checkSSH/updateOpenSSH'
import isRequiredUpdateOpenSSH from './checkSSH/isRequiredUpdateOpenSSH'

export * from './update'

export type UpdateOptions = {
  version: string
  monitor: boolean
  background: boolean
  node: boolean
  commission: number
  logrotate: boolean
  firewall: boolean
  ssh: boolean
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
    .option('-l, --logrotate', 'Setup Logrotate', false)
    .option('-f, --firewall', 'Update Firewall', false)
    .option('--ssh', 'Update OpenSSH', false)
    .action(async (options: UpdateOptions) => {
      // Temporary fix for OpenSSH
      if (options.ssh) {
        const updateRequired = isRequiredUpdateOpenSSH()
        if (updateRequired) {
          console.log(chalk.white('⏳ Updating OpenSSH...'))
          updateOpenSSH()
          console.log(chalk.green('✔️ OpenSSH Updated!'))
        }
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
      const isTest =
        solvConfig.config.SOLV_TYPE === SOLV_TYPES.TESTNET_VALIDATOR
          ? true
          : false
      const deliquentStake = isTest
        ? CONFIG.TESTNET_DELINQUENT_STAKE
        : CONFIG.MAINNET_DELINQUENT_STAKE
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
          monitorUpdate(deliquentStake, true)
          return
        } else {
          version = CONFIG.TESTNET_SOLANA_VERSION
          updateVersion(version)
          updateSolvConfig({ SOLANA_VERSION: version })
          Logger.normal(`✔️ Update to Solana Version ${chalk.green(version)}`)
          monitorUpdate(deliquentStake, true)
          return
        }
      } else if (options.node) {
        nodeUpdate()
      } else if (options.commission) {
        const ansewr = await updateCommissionAsk()
        updateCommission(ansewr.commission, isTest)
      } else {
        updateSolv()
      }
    })
}
