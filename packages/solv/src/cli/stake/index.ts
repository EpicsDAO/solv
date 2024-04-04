import { program } from '@/index'
import { delegateStake } from './delegateStake'
export * from './delegateStake'
import {
  ConfigParams,
  readOrCreateDefaultConfig,
} from '@/lib/readOrCreateDefaultConfig'
import { stakeAccountQuestion } from './stakeAccountQuestion'
import { deactivateStake } from './deactivateStake'
import { withdrawStake } from './withdrawStake'
import { delegateStakeAsk } from '../server/stake/delegateStakeAsk'
import { deactivateStakeAsk } from '../server/stake/deactivateStakeAsk'
import { unstakeAsk } from '../server/stake/unstakeAsk'
import { withdrawStakeAsk } from '../server/stake/withdrawStakeAsk'
import chalk from 'chalk'

export const stakeCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('stake')
    .description(cmds.stake)
    .action(async () => {
      await stakeAccountQuestion(solvConfig)
      const newSolvConfig = readOrCreateDefaultConfig()
      const { validatorVoteAccount, stakeAccounts } =
        await delegateStakeAsk(newSolvConfig)
      for await (const stakeAccount of stakeAccounts) {
        try {
          await delegateStake(stakeAccount, validatorVoteAccount)
        } catch (error) {
          console.log(
            chalk.yellow(
              `Network might be busy, please try again later\nYou can use a custom RPC endpoint to avoid this issue\n`,
            ),
          )
        }
      }
    })

  program
    .command('unstake')
    .description(cmds.stake)
    .action(async () => {
      const { unstakeOption } = await unstakeAsk()
      if (unstakeOption === 'Deactivate Stake') {
        const { stakeAccounts } = await deactivateStakeAsk()
        for await (const stakeAccount of stakeAccounts) {
          try {
            await deactivateStake(stakeAccount)
          } catch (error) {
            console.log(
              chalk.yellow(
                `Network might be busy, please try again later\nYou can use a custom RPC endpoint to avoid this issue\n`,
              ),
            )
          }
        }
      } else {
        const answer = await withdrawStakeAsk()
        await withdrawStake(
          answer.stakeAccounts,
          answer.destinationAddress,
          answer.solAmount,
        )
      }
    })
}
