import { readOrCreateDefaultConfig } from '@/lib/readOrCreateDefaultConfig'
import inquirer from 'inquirer'

export type withdrawStakeAskOption = {
  stakeAccounts: string
  destinationAddress: string
  solAmount: string
}

export const withdrawStakeAsk = async () => {
  const config = readOrCreateDefaultConfig()
  const stakeAccount = config.config.STAKE_ACCOUNT
  const answer = await inquirer.prompt<withdrawStakeAskOption>([
    {
      type: 'checkbox',
      name: 'stakeAccounts',
      message: `Which Stake Account would you like to withdraw stake from?`,
      choices: stakeAccount,
    },
    {
      type: 'input',
      name: 'destinationAddress',
      message: `What is the destination address for the withdrawn SOL?`,
      default() {
        return 'xxxxxxxx'
      },
    },
    {
      type: 'input',
      name: 'solAmount',
      message: `How many SOL would you like to withdraw?`,
      default() {
        return 1
      },
    },
  ])
  return answer
}
