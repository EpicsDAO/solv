import { DEFAULT_SOLANA_VERSION, program } from '@/index'
import { monitorUpdate, updateVersion } from './update'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'

export * from './update'

export const updateCommands = async () => {
  program
    .command('update')
    .alias('u')
    .description('Monitor Update')
    .option('-m, --maxDelinquentStake', 'Max Delinquent Stake e.g 5', '5')
    .option(
      '-v, --version <version>',
      `Solana Version e.g ${DEFAULT_SOLANA_VERSION}`,
      DEFAULT_SOLANA_VERSION
    )
    .action((options: any) => {
      updateVersion(options.version)
      Logger.normal(
        `✔️ Monitoring Update with Max Delinquent Stake ${chalk.green(
          options.maxDelinquentStake
        )}`
      )
      monitorUpdate(options.maxDelinquentStake)
    })
}
