import { SolvConfig } from './solvTypes'

export module Questions {
  export const release = [
    {
      type: 'input',
      name: 'version',
      message: "What's the new version? (e.g. 0.0.1)",
      default() {
        return '0.0.1'
      },
    },
  ]

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
      message: `What is the Validator Vote Account Address?(e.g. ${SolvConfig.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY})`,
      default() {
        return SolvConfig.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY
      },
    },
    {
      type: 'input',
      name: 'authorityAccount',
      message: `What is your Authority Account Address?(e.g. ${SolvConfig.DEFAULT_AUTHORITY_ACCOUNT_KEYFILE})`,
      default() {
        return SolvConfig.DEFAULT_AUTHORITY_ACCOUNT_KEYFILE
      },
    },
  ]
}
