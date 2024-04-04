import { readOrCreateDefaultConfig } from '@/lib/readOrCreateDefaultConfig'
import inquirer from 'inquirer'

export type deactivateStakeAskOption = {
  stakeAccounts: string[]
}

export const deactivateStakeAsk = async () => {
  const config = readOrCreateDefaultConfig()
  const stakeAccount = config.config.STAKE_ACCOUNT
  const answer = await inquirer.prompt<deactivateStakeAskOption>([
    {
      type: 'checkbox',
      name: 'stakeAccounts',
      message: `Which Stake Account would you like to deactivate stake from?`,
      choices: stakeAccount,
    },
  ])
  return answer
}
