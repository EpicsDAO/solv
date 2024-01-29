import { program } from '@/index'
import { monitorUpdate, updateVersion } from './update'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { updateSolv } from './updateSolv'
import { spawnSync } from 'child_process'
import { CONFIG } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { updateSolvConfig } from '@/lib/updateSolvConfig'

export * from './update'

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
    .action((options: any) => {
      if (options.monitor) {
        updateVersion(options.version)
        updateVersion(options.version)
        Logger.normal(
          `✔️ Monitoring Update with Max Delinquent Stake ${chalk.green(
            options.maxDelinquentStake,
          )}`,
        )
        monitorUpdate(CONFIG.DELINQUENT_STAKE)
      } else if (options.background) {
        updateVersion(options.version)
        updateSolvConfig({ SOLANA_VERSION: options.version })
        Logger.normal(
          `✔️ Update to Solana Version ${chalk.green(options.version)}`,
        )
        monitorUpdate(CONFIG.DELINQUENT_STAKE, true)
      } else if (options.node) {
        const cmd = `git -C /home/solv/.nodenv/plugins/node-build pull`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
        const cmd2 = `nodenv install ${CONFIG.NODE_VERSION}`
        spawnSync(cmd2, { shell: true, stdio: 'inherit' })
        const cmd3 = `nodenv local ${CONFIG.NODE_VERSION}`
        spawnSync(cmd3, { shell: true, stdio: 'inherit' })
        const cmd4 = `nodenv rehash`
        spawnSync(cmd4, { shell: true, stdio: 'inherit' })
      } else {
        updateSolv()
      }
    })
}
