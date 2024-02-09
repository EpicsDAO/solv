import { DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY } from '@/config/config'
import { VERSION } from '@/lib/version'

export module Questions {
  export const delegateStake = [
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
      message: `What is the Validator Vote Account Address?(e.g. ${DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY})`,
      default() {
        return DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY
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
  ]
  const unstakeOptions = ['Deactivate Stake', 'Withdraw Stake']
  export const unstake = [
    {
      type: 'list',
      name: 'unstakeOption',
      message: 'What would you like to do?',
      choices: unstakeOptions,
      default: unstakeOptions[0],
    },
  ]

  export const deactivateStake = [
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
      name: 'authorityKeyPath',
      message: `What is the Authority Account Account Address?(Enter to default)`,
      default() {
        return '~/mainnet-validator-keypair.json'
      },
    },
  ]

  export const withdrawStake = [
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
  ]
}
