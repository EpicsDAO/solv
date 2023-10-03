import { program } from '@/index'
import { monitorUpdate, updateVersion } from './update'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { SolvConfig } from '@/types/solvTypes'
import { updateSolv } from './updateSolv'

export * from './update'

export const updateCommands = async () => {
  program
    .command('update')
    .alias('u')
    .description(
      'Solana Version Update, Restart and Monitoring Delinquent Stake'
    )
    .option(
      '-m, --maxDelinquentStake <maxDelinquentStake>',
      `Max Delinquent Stake e.g ${SolvConfig.DEFAULT_DELINQUENT_STAKE}`,
      `${SolvConfig.DEFAULT_DELINQUENT_STAKE}`
    )
    .option(
      '-v, --version <version>',
      `Solana Version e.g ${SolvConfig.DEFAULT_SOLANA_VERSION}`,
      SolvConfig.DEFAULT_SOLANA_VERSION
    )
    .action((options: any) => {
      updateSolv()
      updateVersion(options.version)
      Logger.normal(
        `✔️ Monitoring Update with Max Delinquent Stake ${chalk.green(
          options.maxDelinquentStake
        )}`
      )
      const maxDelinquentStake = parseInt(options.maxDelinquentStake) || 5
      monitorUpdate(maxDelinquentStake)
    })
}
