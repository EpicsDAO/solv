import inquirer from 'inquirer'
import { createStakeAccount } from './createStakeAccount'

export type StakeAccountQuestion = {
  stakeAuthorityKeyPath: string
  solAmount: number
}

export const stakeAccountQuestion = async () => {
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

  const answer = await inquirer.prompt<StakeAccountQuestion>([
    {
      type: 'input',
      name: 'stakeAuthorityKeyPath',
      message: 'What is the stake authority key path?',
      default: '~/mainnet-authority-keypair.json',
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
