import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import inquirer from 'inquirer'
import { INSTALLER_CHOICES, server } from '../server'
import { delegateStake } from '@/cli/stake'
import { stakeAccountQuestion } from '@/cli/stake/stakeAccountQuestion'
import { Questions } from '@/types/questions'
import { deactivateStake } from '@/cli/stake/deactivateStake'
import { withdrawStake } from '@/cli/stake/withdrawStake'

export enum STAKE_CHOICES {
  STAKE,
  USTAKE,
  RETURN_TO_INSTALLER,
}

export const stakeCommands = async (solvConfig: ConfigParams) => {
  const { config, locale } = solvConfig
  const { cmds, installerSub } = locale
  const choices = installerSub[INSTALLER_CHOICES.STAKE].map((item, index) => {
    return `${index + 1}${item}`
  })
  const answer = await inquirer.prompt<{ server: string }>([
    {
      name: 'server',
      type: 'list',
      message: cmds.stake,
      choices,
    },
  ])
  const selectedOption = (Number(answer.server.split(')')[0]) -
    1) as STAKE_CHOICES
  switch (selectedOption) {
    case STAKE_CHOICES.STAKE:
      await stakeAccountQuestion()
      const { validatorVoteAccount, stakeAccount, authorityKeyPath } =
        await inquirer.prompt<{
          stakeAccount: string
          validatorVoteAccount: string
          authorityKeyPath: string
        }>(Questions.delegateStake)
      await delegateStake(stakeAccount, validatorVoteAccount, authorityKeyPath)
      break
    case STAKE_CHOICES.USTAKE:
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
      break
    case STAKE_CHOICES.RETURN_TO_INSTALLER:
      await server(solvConfig)
      break
  }
}
