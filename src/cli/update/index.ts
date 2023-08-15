import { program } from '@/index'
import { monitorUpdate, updateVersion } from './update'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'

export * from './update'

export const updateCommands = async () => {
  const update = program
    .command('update')
    .description('Update Solana Validator Node')

  update
    .command('solana')
    .alias('s')
    .description('Update Solana Version')
    .argument('<version>', 'Solana Version e.g. 1.16.7', '1.16.7')
    .action(async (version: string) => {
      const spinner = Logger.syncSpinner(
        `✔️ Updating Solana to ${chalk.green(version)}`
      )
      await updateVersion(version)
      spinner.stop(true)
    })

  update
    .command('monitor')
    .alias('m')
    .description('Monitor Update')
    .argument('<maxDelinquentStake>', 'Max Delinquent Stake e.g. 10')
    .action(async (maxDelinquentStake: number) => {
      const spinner = Logger.syncSpinner(
        `✔️ Monitoring Update with Max Delinquent Stake ${chalk.green(
          maxDelinquentStake
        )}`
      )
      await monitorUpdate(maxDelinquentStake)
      spinner.stop(true)
    })

  update
    .command('all')
    .alias('a')
    .description('Update Solana Version and Monitor Update')
    .argument('<version>', 'Solana Version e.g. 1.16.7')
    .argument('<maxDelinquentStake>', 'Max Delinquent Stake e.g. 10')
    .action(async (version: string, maxDelinquentStake: number) => {
      const spinner = Logger.syncSpinner(
        `✔️ Updating Solana to ${chalk.green(
          version
        )} and Monitoring Update with Max Delinquent Stake ${chalk.green(
          maxDelinquentStake
        )}`
      )
      await updateVersion(version)
      await monitorUpdate(maxDelinquentStake)
      spinner.stop(true)
    })
}
