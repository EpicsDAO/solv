import inquirer from 'inquirer'
import { createStakeAccount } from './createStakeAccount'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { NETWORK_TYPES } from '@/config/config'
import { createStakeKeypair } from '../server/stake/createStakeKeypair'
import { updateSolvConfig } from '@/lib/updateSolvConfig'

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
  const authorityKeypair =
    solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      ? '~/testnet-authority-keypair.json'
      : '~/mainnet-authority-keypair.json'
  const answer = await inquirer.prompt<StakeAccountQuestion>([
    {
      type: 'input',
      name: 'solAmount',
      message: 'How many SOL would you like to stake?',
      default: 1,
    },
  ])
  const stakeKeypair = await createStakeKeypair()

  const currentStakeAccount = solvConfig.config.STAKE_ACCOUNT || []
  // Array of unique stake accounts
  const uniqueStakeAccount = Array.from(
    new Set([...currentStakeAccount, stakeKeypair]),
  )
  updateSolvConfig({ STAKE_ACCOUNT: uniqueStakeAccount })
  return createStakeAccount(stakeKeypair, authorityKeypair, answer.solAmount)
}
