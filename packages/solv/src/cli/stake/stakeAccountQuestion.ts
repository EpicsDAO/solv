import inquirer from 'inquirer'
import { createStakeAccount } from './createStakeAccount'
import { getKeypairPaths } from '@/lib/getKeypairPaths'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'

export type StakeAccountQuestion = {
  stakeAuthorityKeyPath: string
  solAmount: number
}

export const stakeAccountQuestion = async (solvConfig: ConfigParams) => {
  const confirmCreateStakeAccount = await inquirer.prompt<{
    confirmCreateStakeAccount: boolean
  }>([
    {
      type: 'confirm',
      name: 'confirmCreateStakeAccount',
      message: 'Would you like to create a new stake account?',
      default: false,
    },
  ])
  if (!confirmCreateStakeAccount.confirmCreateStakeAccount) {
    return false
  }
  const { keypairs, defaultKey } = getKeypairPaths(solvConfig)
  const answer = await inquirer.prompt<StakeAccountQuestion>([
    {
      type: 'list',
      name: 'stakeAuthorityKeyPath',
      message: 'What is the stake authority key path?',
      choices: keypairs,
      default: defaultKey,
    },
    {
      type: 'input',
      name: 'solAmount',
      message: 'How many SOL would you like to stake?',
      default: 1,
    },
  ])
  createStakeAccount(answer.stakeAuthorityKeyPath, answer.solAmount)
  return true
}
