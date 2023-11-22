import { program } from '@/index'
import { monitorUpdate, updateVersion } from './update'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { updateSolv } from './updateSolv'
import { DEFAULT_DELINQUENT_STAKE, DEFAULT_SOLANA_VERSION } from '@/config'

export * from './update'

export const updateCommands = async () => {
  program
    .command('update')
    .alias('u')
    .description(
      'Solana Version Update, Restart and Monitoring Delinquent Stake'
    )
    .option(
      '-v, --version <version>',
      `Solana Version e.g ${DEFAULT_SOLANA_VERSION}`,
      DEFAULT_SOLANA_VERSION
    )
    .option('-m, --monitor', 'Monitor Delinquent Stake Update', false)
    .option('-b, --background', 'No Monitor Delinquent Stake Update', false)
    .action((options: any) => {
      console.log('Update Options: ', options)
      if (options.monitor) {
        updateVersion(options.version)
        Logger.normal(
          `✔️ Monitoring Update with Max Delinquent Stake ${chalk.green(
            options.maxDelinquentStake
          )}`
        )
        monitorUpdate(DEFAULT_DELINQUENT_STAKE)
      } else if (options.background) {
        updateVersion(options.version)
        Logger.normal(
          `✔️ Update to Solana Version ${chalk.green(options.version)}`
        )
        monitorUpdate(DEFAULT_DELINQUENT_STAKE, true)
      } else {
        updateSolv()
      }
    })
}
