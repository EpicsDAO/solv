import { program } from '@/index'
import { delegateStake } from './delegateStake'
import inquirer from 'inquirer'
import { Questions } from '@/types/questions'
export * from './delegateStake'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { stakeAccountQuestion } from './stakeAccountQuestion'
import { deactivateStake } from './deactivateStake'
import { withdrawStake } from './withdrawStake'

export const stakeCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('stake')
    .description(cmds.stake)
    .action(async () => {
      await stakeAccountQuestion()
      const { validatorVoteAccount, stakeAccount, authorityKeyPath } =
        await inquirer.prompt<{
          stakeAccount: string
          validatorVoteAccount: string
          authorityKeyPath: string
        }>(Questions.delegateStake)
      await delegateStake(stakeAccount, validatorVoteAccount, authorityKeyPath)
    })

  program
    .command('unstake')
    .description(cmds.stake)
    .action(async () => {
      const { unstakeOption } = await inquirer.prompt<{
        unstakeOption: string
      }>(Questions.unstake)
      if (unstakeOption === 'Deactivate Stake') {
        const { stakeAccount, authorityKeyPath } = await inquirer.prompt<{
          stakeAccount: string
          authorityKeyPath: string
        }>(Questions.deactivateStake)
        await deactivateStake(stakeAccount, authorityKeyPath)
      } else {
        const answer = await inquirer.prompt<{
          stakeAccount: string
          destinationAddress: string
          solAmount: string
        }>(Questions.withdrawStake)
        await withdrawStake(
          answer.stakeAccount,
          answer.destinationAddress,
          answer.solAmount,
        )
      }
    })
}
