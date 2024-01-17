import { DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY } from '@/config/config'
import { VERSION } from '@/lib/version'

export module Questions {
  export const release = [
    {
      type: 'input',
      name: 'version',
      message: `What's the new version?`,
      default() {
        const newVersion = incrementVersion(VERSION)
        return newVersion
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
      message: `What is the Validator Vote Account Address?(e.g. ${DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY})`,
      default() {
        return DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY
      },
    },
    {
      type: 'input',
      name: 'authorityAccount',
      message: `What is the Authority Account Account Address?(Enter to default)`,
      default() {
        return ''
      },
    },
  ]
}

export function incrementVersion(version: string) {
  const parts = version.split('.')
  const last = parseInt(parts[parts.length - 1], 10)
  parts[parts.length - 1] = (last + 1).toString()
  return parts.join('.')
}
