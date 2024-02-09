import { program } from '@/index'
import { delegateStake } from './delegateStake'
import inquirer from 'inquirer'
import { Questions } from '@/types/questions'
export * from './delegateStake'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'

export const stakeCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('stake')
    .description(cmds.stake)
    .action(async () => {
      const { validatorVoteAccount, stakeAccount, authorityKeyPath } =
        await inquirer.prompt<{
          stakeAccount: string
          validatorVoteAccount: string
          authorityKeyPath: string
        }>(Questions.delegateStake)
      await delegateStake(stakeAccount, validatorVoteAccount, authorityKeyPath)
    })
}
