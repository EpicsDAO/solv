import {
  ConfigParams,
  readOrCreateDefaultConfig,
} from '@/lib/readOrCreateDefaultConfig'
import inquirer from 'inquirer'
import { INSTALLER_CHOICES, server } from '../server'
import { delegateStake } from '@/cli/stake'
import { stakeAccountQuestion } from '@/cli/stake/stakeAccountQuestion'
import { deactivateStake } from '@/cli/stake/deactivateStake'
import { withdrawStake } from '@/cli/stake/withdrawStake'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { delegateStakeAsk } from './delegateStakeAsk'
import { unstakeAsk } from './unstakeAsk'
import { deactivateStakeAsk } from './deactivateStakeAsk'
import { withdrawStakeAsk } from './withdrawStakeAsk'
import chalk from 'chalk'

export enum STAKE_CHOICES {
  STAKE,
  USTAKE,
  RETURN_TO_INSTALLER,
}

export const stakeCmds = async (solvConfig: ConfigParams) => {
  const { locale } = solvConfig
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
  if (selectedOption === STAKE_CHOICES.STAKE) {
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
    return
  } else if (selectedOption === STAKE_CHOICES.USTAKE) {
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
    return
  } else {
    await server(solvConfig)
    return
  }
}
