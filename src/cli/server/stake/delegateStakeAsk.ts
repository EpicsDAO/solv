import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import inquirer from 'inquirer'

export type delegateStakeOption = {
  stakeAccount: string
  validatorVoteAccount: string
  authorityKeyPath: string
}

export const delegateStakeAsk = async (config: ConfigParams) => {
  const answer = await inquirer.prompt<delegateStakeOption>([
    {
      type: 'input',
      name: 'stakeAccount',
      message: `What is your Stake Account Address?(e.g. xxxxxxxxxxxxxx)`,
      default() {
        return 'xxxxxxxxxxxxxxxx'
      },
    },
    {
      type: 'input',
      name: 'validatorVoteAccount',
      message: `What is the Validator Vote Account Address?(e.g. ${config.config.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY})`,
      default() {
        return config.config.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY
      },
    },
    {
      type: 'input',
      name: 'authorityKeyPath',
      message: `What is the Authority Account Account Address?(Enter to default)`,
      default() {
        return '~/mainnet-validator-keypair.json'
      },
    },
  ])
  return answer
}
