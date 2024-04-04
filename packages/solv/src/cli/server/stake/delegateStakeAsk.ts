import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import inquirer from 'inquirer'

export type delegateStakeOption = {
  stakeAccounts: string[]
  validatorVoteAccount: string
}

export const delegateStakeAsk = async (config: ConfigParams) => {
  const stakeAccount = config.config.STAKE_ACCOUNT
  const answer = await inquirer.prompt<delegateStakeOption>([
    {
      type: 'checkbox',
      name: 'stakeAccounts',
      message: `Which Stake Account would you like to delegate stake to?`,
      choices: stakeAccount,
    },
    {
      type: 'input',
      name: 'validatorVoteAccount',
      message: `What is the Validator Vote Account Address?(e.g. ${config.config.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY})`,
      default() {
        return config.config.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY
      },
    },
  ])
  return answer
}
